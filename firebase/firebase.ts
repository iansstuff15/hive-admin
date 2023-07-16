import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyBIJm0ggeRN46fVQvaHBMSbTgZ0qzlJKQg",
    authDomain: "hive-5eb83.firebaseapp.com",
    projectId: "hive-5eb83",
    storageBucket: "hive-5eb83.appspot.com",
    messagingSenderId: "742415027647", 
    appId: "1:742415027647:web:2404060af53298d35d250a",
    measurementId: "G-RXFHJBD9LX"
  };
  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app)