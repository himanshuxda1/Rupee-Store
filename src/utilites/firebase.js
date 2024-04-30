
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDEitKxjW3EDuyp5NiGba_XihWeoBZXxN0",
  authDomain: "rupee-store-95023.firebaseapp.com",
  projectId: "rupee-store-95023",
  storageBucket: "rupee-store-95023.appspot.com",
  messagingSenderId: "889776523704",
  appId: "1:889776523704:web:f0e4d96d105e637c52274d",
  measurementId: "G-KEG6JSD1NM"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);