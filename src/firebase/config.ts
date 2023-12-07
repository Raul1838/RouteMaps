import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import firebaseProdConfig from './firebaseProdConfig';
import firebaseTestConfig from './firebaseTestConfig';

const firebaseConfig = process.env.NODE_ENV === 'test' ? firebaseTestConfig : firebaseProdConfig;

export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);