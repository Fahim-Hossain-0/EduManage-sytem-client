// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiKIOfRNBNcScCSZ9uyAedXX4uXHypnAc",
  authDomain: "profast-f0511.firebaseapp.com",
  projectId: "profast-f0511",
  storageBucket: "profast-f0511.firebasestorage.app",
  messagingSenderId: "388193556367",
  appId: "1:388193556367:web:cf526966ee67adaba69dfa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);