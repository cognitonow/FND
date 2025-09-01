import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6a9GPoT3B3FkdeB2SIMK1VfGyYFnH3u8",
  authDomain: "fndme-gwtyl.firebaseapp.com",
  projectId: "fndme-gwtyl",
  storageBucket: "fndme-gwtyl.firebasestorage.app",
  messagingSenderId: "233990614661",
  appId: "1:233990614661:web:4356b936c163f18e12c3ec",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
