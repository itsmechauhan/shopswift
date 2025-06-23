
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB-wSG39IWRS2uvJh-a9roqLZjOMRMUV7s",
  authDomain: "swiftshop-ea783.firebaseapp.com",
  projectId: "swiftshop-ea783",
  storageBucket: "swiftshop-ea783.firebasestorage.app",
  messagingSenderId: "270510716361",
  appId: "1:270510716361:web:b2d2257bf85626157a6418",
  measurementId: "G-0W0LNYSMYM"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
