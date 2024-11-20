import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA2aVfJFGWwmDVkJZ-LRWAA8IOn7i6SjdQ",
  authDomain: "esteticaybelleza-eccbd.firebaseapp.com",
  projectId: "esteticaybelleza-eccbd",
  storageBucket: "esteticaybelleza-eccbd.firebasestorage.app",
  messagingSenderId: "168213442256",
  appId: "1:168213442256:web:52238cb769088ba8d7b8d5",
  measurementId: "G-YWW1RT91K1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);