// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCds42QmgwpA9CZzCxT8sb8LgBy3zCRp5c",
  authDomain: "universalbackend-7f7a6.firebaseapp.com",
  projectId: "universalbackend-7f7a6",
  storageBucket: "universalbackend-7f7a6.appspot.com",
  messagingSenderId: "1046025171083",
  appId: "1:1046025171083:web:2ccfd1736c0f6f2364e48e"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);