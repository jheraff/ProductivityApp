// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfNXT0fAZ7PHau1xMmNudm98GFQZSQmFY",
  authDomain: "productivityapp-a8204.firebaseapp.com",
  projectId: "productivityapp-a8204",
  storageBucket: "productivityapp-a8204.firebasestorage.app",
  messagingSenderId: "188158849991",
  appId: "1:188158849991:web:ec1670245b222aadbf9fe2",
  measurementId: "G-3YLJKNJ4LB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Set up analytics
isSupported().then((isAnalyticsSupported) => {
  if (isAnalyticsSupported) {
    const analytics = getAnalytics(app);
  }
});

// Set up authentication with persistence
export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Auth persistence set to local");
  })
  .catch((error) => {
    console.error("Error setting auth persistence:", error);
  });

// Set up providers and Firestore
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
