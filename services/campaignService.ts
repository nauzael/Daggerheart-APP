
import { db, auth } from '../firebaseConfig';
import { collection, addDoc, query, where, getDocs, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { Campaign } from '../types';

const COLLECTION_NAME = 'campaigns';

const generateInviteCode = () => {
    return Math.random().toString(36).substring(2, 7).toUpperCase();
}

export const campaignService = {
    createCampaign: async (name: string): Promise<Campaign | null> => {
        if (!db || !auth?.currentUser) return null;

        const newCampaign: Campaign = {
            id: '', // Firestore creates this
            name,
            gmId: auth.currentUser.uid,
            inviteCode: generateInviteCode(),
            createdAt: Date.now()
        };

        try {
            const docRef = await addDoc(collection(db, COLLECTION_NAME), newCampaign);
            // We don't need to update the ID inside the doc immediately for logic to work, 
            // but it's good practice if we fetch plain objects.
            return { ...newCampaign, id: docRef.id };
        } catch (e) {
            console.error("Error creating campaign", e);
            throw e;
        }
    },

    deleteCampaign: async (campaignId: string): Promise<void> => {
        if(!db) return;
        await deleteDoc(doc(db, COLLECTION_NAME, campaignId));
    },

    subscribeToMyCampaigns: (onUpdate: (campaigns: Campaign[]) => void): (() => void) => {
        if (!db || !auth?.currentUser) return () => {};

        const q = query(collection(db, COLLECTION_NAME), where("gmId", "==", auth.currentUser.uid));
        return onSnapshot(q, (snapshot) => {
            const campaigns: Campaign[] = [];
            snapshot.forEach(doc => {
                campaigns.push({ ...doc.data(), id: doc.id } as Campaign);
            });
            onUpdate(campaigns);
        });
    },

    findCampaignByCode: async (code: string): Promise<Campaign | null> => {
        if (!db) return null;
        // Note: Ideally inviteCode should be indexed/unique
        const q = query(collection(db, COLLECTION_NAME), where("inviteCode", "==", code));
        const snapshot = await getDocs(q);
        if (snapshot.empty) return null;
        const doc = snapshot.docs[0];
        return { ...doc.data(), id: doc.id } as Campaign;
    }
};
