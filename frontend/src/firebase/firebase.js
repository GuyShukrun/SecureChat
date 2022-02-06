// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGKwVo_uj7NJnsOillpO819qIrwPH-LOE",
  authDomain: "chat-fe2b0.firebaseapp.com",
  projectId: "chat-fe2b0",
  storageBucket: "chat-fe2b0.appspot.com",
  messagingSenderId: "229088629336",
  appId: "1:229088629336:web:54d50e12ead1c601e1b02d",
  measurementId: "G-T8RJ2BC2JR",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
