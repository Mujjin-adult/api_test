// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken } from "firebase/messaging";

// Your web app's Firebase configuration (daon-47f9c - Backend 프로젝트와 동일)
const firebaseConfig = {
  apiKey: "AIzaSyAmhyE1WLIbEay0tE_A9oLk8NxC5mYlwHM",
  authDomain: "daon-47f9c.firebaseapp.com",
  projectId: "daon-47f9c",
  storageBucket: "daon-47f9c.firebasestorage.app",
  messagingSenderId: "855429318712",
  appId: "1:855429318712:web:00b2527c03f41289433ecd",
  measurementId: "G-XPVFWXP6T2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Authentication 초기화
const auth = getAuth(app);

// FCM 메시징 초기화
const messaging = getMessaging(app);

export { auth, messaging, getToken };
