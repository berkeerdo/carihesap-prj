import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAbbjdeJUqlVEWpp5762aezvqt9YkQrNS4",
  authDomain: "carihesap-58b8c.firebaseapp.com",
  projectId: "carihesap-58b8c",
  storageBucket: "carihesap-58b8c.appspot.com",
  messagingSenderId: "1052897096970",
  appId: "1:1052897096970:web:2b0edafca85c14eae1f6f3",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
