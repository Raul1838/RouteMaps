// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVOJPZxYP9RoB-I_3kdN-36gv9JdHr1cM",
  authDomain: "routemaps-34d2b.firebaseapp.com",
  projectId: "routemaps-34d2b",
  storageBucket: "routemaps-34d2b.appspot.com",
  messagingSenderId: "528232130057",
  appId: "1:528232130057:web:25c5779566edc1de92bad8"
};

// Initialize Firebase
export const FirebaseApp = initializeApp( firebaseConfig );

export const FirebaseAuth = getAuth( FirebaseApp );

export const FirebaseDB = getFirestore( FirebaseApp );
