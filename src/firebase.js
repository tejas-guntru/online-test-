// Firebase core
import { initializeApp } from "firebase/app";

// Firebase services
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


/**
 * 🔥 Firebase configuration
 * Project: online-test2
 */
const firebaseConfig = {
  apiKey: "AIzaSyClU1Oen4sJzZbtF1HtF0-Kmd7RV5nwyS0",
  authDomain: "online-test2.firebaseapp.com",
  projectId: "online-test2",
  storageBucket: "online-test2.firebasestorage.app",
  messagingSenderId: "25209926663",
  appId: "1:25209926663:web:39c1e2b343f5d5aad1a6a2",
};

// Initialize Firebase app (ONLY ONCE)
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

// Optional default export
export default app;
