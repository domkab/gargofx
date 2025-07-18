import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "gargofx-cdd6b.firebaseapp.com",
  projectId: "gargofx-cdd6b",
  storageBucket: "gargofx-cdd6b.firebasestorage.app",
  messagingSenderId: "747614347281",
  appId: "1:747614347281:web:bf168be2a99bc06aee51b0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);