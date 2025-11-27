
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, GoogleAuthProvider, indexedDBLocalPersistence, browserLocalPersistence } from 'firebase/auth';
import { Capacitor } from '@capacitor/core';

// Configuración proporcionada por el usuario
const firebaseConfig = {
  apiKey: "AIzaSyAVrWeeW99pf8X48NbMc7JU7nuQqrpm4Tw",
  authDomain: "daggerheart-75adc.firebaseapp.com",
  projectId: "daggerheart-75adc",
  storageBucket: "daggerheart-75adc.firebasestorage.app",
  messagingSenderId: "526970562110",
  appId: "1:526970562110:web:bc0b5fb81b7aa44dfb536f"
};

let app;
let db: any = null;
let auth: any = null;
let googleProvider: any = null;

try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    
    // CRITICAL FIX FOR CAPACITOR/ANDROID:
    // Use indexedDBLocalPersistence for mobile apps to prevent storage partitioning issues.
    // Standard browserLocalPersistence (localStorage) is often cleared by Android WebViews.
    const persistence = Capacitor.isNativePlatform() ? indexedDBLocalPersistence : browserLocalPersistence;
    
    auth = initializeAuth(app, {
      persistence: persistence
    });

    googleProvider = new GoogleAuthProvider();
    console.log("Firebase initialized successfully linked to project: daggerheart-75adc");
} catch (error) {
    console.error("Error initializing Firebase:", error);
}

export { db, auth, googleProvider };