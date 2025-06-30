import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDzqm1bQMDzS_80w4PmitEAP6Ly-1MI1vI",
  authDomain: "pro3-b7fcd.firebaseapp.com",
  projectId: "pro3-b7fcd",
  storageBucket: "pro3-b7fcd.firebasestorage.app",
  messagingSenderId: "661071336612",
  appId: "1:661071336612:web:7d430e0341fedea7708231",
  measurementId: "G-GH8Q5E2WH7",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
