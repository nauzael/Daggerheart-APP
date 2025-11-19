
import { db, auth } from '../firebaseConfig';
import { collection, getDocs, setDoc, doc, deleteDoc, query, onSnapshot, where } from 'firebase/firestore';
import { Character } from '../types';

const COLLECTION_NAME = 'characters';
const LOCAL_STORAGE_KEY = 'daggerheart-characters';
const LOCAL_STORAGE_EVENT = 'local-storage-update';

// Helper to check if we should use Firebase
const useFirebase = () => {
    return db !== null;
};

// Helper to sanitize data for Firestore (removes undefined values which Firestore rejects)
const sanitizeForFirestore = (data: any) => {
    return JSON.parse(JSON.stringify(data));
};

export const characterService = {
    
    // --- GET ALL CHARACTERS (One-time fetch) ---
    fetchAll: async (): Promise<Character[]> => {
        if (useFirebase() && auth?.currentUser) {
            try {
                const q = query(collection(db, COLLECTION_NAME), where("userId", "==", auth.currentUser.uid));
                const querySnapshot = await getDocs(q);
                const chars: Character[] = [];
                querySnapshot.forEach((doc) => {
                    chars.push(doc.data() as Character);
                });
                return chars;
            } catch (error) {
                console.error("Error fetching from Firebase:", error);
                return [];
            }
        } else {
            // Fallback to LocalStorage
            const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        }
    },

    // --- SUBSCRIBE TO CHARACTERS (Real-time) ---
    subscribe: (
        onUpdate: (characters: Character[]) => void, 
        mode: 'user' | 'campaign' = 'user', 
        campaignId?: string
    ): (() => void) => {
        if (useFirebase() && auth?.currentUser) {
            let q;
            
            if (mode === 'campaign' && campaignId) {
                // GM View: See all characters in this campaign
                q = query(collection(db, COLLECTION_NAME), where("campaignId", "==", campaignId));
            } else {
                // Player View: See only my characters
                q = query(collection(db, COLLECTION_NAME), where("userId", "==", auth.currentUser.uid));
            }

            return onSnapshot(q, (querySnapshot) => {
                const chars: Character[] = [];
                querySnapshot.forEach((doc) => {
                    chars.push(doc.data() as Character);
                });
                onUpdate(chars);
            }, (error) => {
                console.error("Error in realtime subscription:", error);
                // Fallback to empty array on permission error or other issues
                onUpdate([]);
            });
        } else {
            // Fallback for LocalStorage (Simulated Subscription)
            const loadFromLocal = () => {
                const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
                let chars: Character[] = saved ? JSON.parse(saved) : [];
                
                // If viewing a campaign in offline mode (not really supported, but prevents crash)
                if (mode === 'campaign') {
                    chars = []; 
                }
                onUpdate(chars);
            };

            loadFromLocal(); // Initial load

            // Listen for custom events to trigger updates across components
            const handleEvent = () => loadFromLocal();
            window.addEventListener(LOCAL_STORAGE_EVENT, handleEvent);
            window.addEventListener('storage', handleEvent); // Cross-tab support

            return () => {
                window.removeEventListener(LOCAL_STORAGE_EVENT, handleEvent);
                window.removeEventListener('storage', handleEvent);
            }; 
        }
    },

    // --- SAVE (CREATE OR UPDATE) CHARACTER ---
    save: async (character: Character): Promise<void> => {
        if (useFirebase() && auth?.currentUser) {
            try {
                if (!character.userId) {
                    character.userId = auth.currentUser.uid;
                }
                const sanitizedCharacter = sanitizeForFirestore(character);
                await setDoc(doc(db, COLLECTION_NAME, character.id), sanitizedCharacter);
            } catch (error) {
                console.error("Error saving to Firebase:", error);
                throw error; 
            }
        } else {
            // Fallback to LocalStorage
            const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
            const chars: Character[] = saved ? JSON.parse(saved) : [];
            const index = chars.findIndex(c => c.id === character.id);
            
            if (index >= 0) {
                chars[index] = character;
            } else {
                chars.push(character);
            }
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(chars));
            // Trigger update for subscribers
            window.dispatchEvent(new Event(LOCAL_STORAGE_EVENT));
        }
    },

    // --- DELETE CHARACTER ---
    delete: async (characterId: string): Promise<void> => {
        if (useFirebase() && auth?.currentUser) {
            try {
                await deleteDoc(doc(db, COLLECTION_NAME, characterId));
            } catch (error) {
                console.error("Error deleting from Firebase:", error);
            }
        } else {
            // Fallback to LocalStorage
            const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (saved) {
                const chars: Character[] = JSON.parse(saved);
                const newChars = chars.filter(c => c.id !== characterId);
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newChars));
                window.dispatchEvent(new Event(LOCAL_STORAGE_EVENT));
            }
        }
    },

    // --- SYNC LOCAL TO CLOUD (Utility for migration) ---
    syncLocalToCloud: async (): Promise<void> => {
        if (!useFirebase() || !auth?.currentUser) return;
        
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
            const chars: Character[] = JSON.parse(saved);
            for (const char of chars) {
                char.userId = auth.currentUser.uid; 
                const sanitizedChar = sanitizeForFirestore(char);
                await setDoc(doc(db, COLLECTION_NAME, char.id), sanitizedChar);
            }
            console.log(`Migrated ${chars.length} characters to Cloud.`);
            localStorage.removeItem(LOCAL_STORAGE_KEY);
            window.dispatchEvent(new Event(LOCAL_STORAGE_EVENT)); // Notify that local is empty
        }
    },
    
    // --- JOIN CAMPAIGN ---
    joinCampaign: async (characterId: string, campaignId: string): Promise<void> => {
        if (!useFirebase() || !auth?.currentUser) throw new Error("Must be logged in to join campaign");
        try {
             await setDoc(doc(db, COLLECTION_NAME, characterId), { campaignId: campaignId }, { merge: true });
        } catch (e) {
            console.error("Error joining campaign", e);
            throw e;
        }
    },

    // --- LEAVE CAMPAIGN ---
    leaveCampaign: async (characterId: string): Promise<void> => {
         if (!useFirebase() || !auth?.currentUser) return;
         try {
              await setDoc(doc(db, COLLECTION_NAME, characterId), { campaignId: null }, { merge: true });
         } catch (e) {
             console.error("Error leaving campaign", e);
             throw e;
         }
    }
};
