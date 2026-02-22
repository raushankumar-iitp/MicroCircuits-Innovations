import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // 1. Import Storage

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
let app;
let auth;
let db;
let storage; // 2. Declare storage variable

try {
    if (!firebaseConfig.apiKey) {
        console.warn("Firebase Config: API Key missing! Check environment variables.");
    }

    console.log("Initializing Firebase Instance...");
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    if (app) {
        db = getFirestore(app);
        storage = getStorage(app); // 3. Initialize Storage
    }
    console.log("Firebase initialized successfully with Project ID:", firebaseConfig.projectId);
} catch (error) {
    console.error("Firebase Critical Initialization Failure:", error.message);
}

export { auth, db, storage }; // 4. Export storage
export default app;



























/*
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
let app;
let auth;
let db;

try {
    if (!firebaseConfig.apiKey) {
        console.warn("Firebase Config: API Key missing! Check environment variables.");
    }

    console.log("Initializing Firebase Instance...");
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    console.log("Firebase initialized successfully with Project ID:", firebaseConfig.projectId);
} catch (error) {
    console.error("Firebase Critical Initialization Failure:", error.message);
}

export { auth, db };
export default app;

*/