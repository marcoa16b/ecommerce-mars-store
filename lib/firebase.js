// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAZ_nN9ih_sEo7GJ1ItM5O_hW44BDoEVL0",
  authDomain: "marsstore-9d041.firebaseapp.com",
  projectId: "marsstore-9d041",
  storageBucket: "marsstore-9d041.appspot.com",
  messagingSenderId: "758583020691",
  appId: "1:758583020691:web:f81886606865d794595166",
  measurementId: "G-P1S3LJBJDV"
};

const app = initializeApp(firebaseConfig); 

export const auth = getAuth(app);
export const db = getFirestore(app);

export default firebaseConfig;