import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBUjhEdF8ZOw_mEELQWLyzBgYcK2elEWQw",
  authDomain: "task-manager-c7c2e.firebaseapp.com",
  projectId: "task-manager-c7c2e",
  storageBucket: "task-manager-c7c2e.firebasestorage.app",
  messagingSenderId: "645362798966",
  appId: "1:645362798966:web:cdc50aaa46036409ef6a57",
  measurementId: "G-L3RL5VZSZC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
