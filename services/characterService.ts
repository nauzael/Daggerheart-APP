
import { db } from '../firebaseConfig';
import { collection, getDocs, setDoc, doc, deleteDoc, query } from 'firebase/firestore';
import { Character } from '../types';

const COLLECTION_NAME = 'characters';
const LOCAL_STORAGE_KEY = 'daggerheart-characters';

// Helper to check if we should use Firebase
const useFirebase = () => {
    return db !== null;
};

// Helper to sanitize data for Firestore (removes undefined values which Firestore rejects)
const sanitizeForFirestore = (data: any) => {
    return JSON.parse(JSON.stringify(data));
};

export const characterService = {
    
    // --- GET ALL CHARACTERS ---
    fetchAll: async (): Promise<Character[]> => {
        if (useFirebase()) {
            try {
                const q = query(collection(db, COLLECTION_NAME));
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

    // --- SAVE (CREATE OR UPDATE) CHARACTER ---
    save: async (character: Character): Promise<void> => {
        if (useFirebase()) {
            try {
                // Firestore throws error on 'undefined', so we sanitize the object
                const sanitizedCharacter = sanitizeForFirestore(character);
                // Firestore uses the ID to determine if it's an update or create (upsert)
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
        }
    },

    // --- DELETE CHARACTER ---
    delete: async (characterId: string): Promise<void> => {
        if (useFirebase()) {
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
            }
        }
    },

    // --- SYNC LOCAL TO CLOUD (Utility for migration) ---
    // Call this once you have Firebase set up to move local chars to the cloud
    syncLocalToCloud: async (): Promise<void> => {
        if (!useFirebase()) return;
        
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
            const chars: Character[] = JSON.parse(saved);
            for (const char of chars) {
                const sanitizedChar = sanitizeForFirestore(char);
                await setDoc(doc(db, COLLECTION_NAME, char.id), sanitizedChar);
            }
            console.log(`Migrated ${chars.length} characters to Cloud.`);
            // Optional: Clear local storage after migration
            // localStorage.removeItem(LOCAL_STORAGE_KEY);
        }
    }
};
