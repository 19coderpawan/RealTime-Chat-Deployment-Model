// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3J3970ZzWG9pcD2yJQdgcf8KmSIWkio0",
  authDomain: "chatapplication-3fe20.firebaseapp.com",
  projectId: "chatapplication-3fe20",
  storageBucket: "chatapplication-3fe20.appspot.com",
  messagingSenderId: "93989084312",
  appId: "1:93989084312:web:41cb4bb3ce00270c7004ed",
  measurementId: "G-LNNN5SWRCK"
};

// Initialize Firebase
export  const app = initializeApp(firebaseConfig);
export  const auth= getAuth(app);
// to create a root reference to upload a file.
// Create a root reference
export  const storage = getStorage(app)
export const  db=getFirestore(app);
const analytics = getAnalytics(app);
