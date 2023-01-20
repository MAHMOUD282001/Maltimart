// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCly3C55w5vz4ao2uku42GG-mJzfqNKzvw",
  authDomain: "maltimart-8b734.firebaseapp.com",
  projectId: "maltimart-8b734",
  storageBucket: "maltimart-8b734.appspot.com",
  messagingSenderId: "441489428429",
  appId: "1:441489428429:web:e6d8af094c179a8a45be84"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export const db = getFirestore(app)

export const storage = getStorage(app)

export default app