import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
import {
  getFirestore,
  collection,
  getDocs,
  initializeFirestore,
  CACHE_SIZE_UNLIMITED,
} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAj0yAicZ7qxMJWFoa-d9MzVn6NarQnWSg",
  authDomain: "finance-tracking-app-2f3d5.firebaseapp.com",
  projectId: "finance-tracking-app-2f3d5",
  storageBucket: "finance-tracking-app-2f3d5.appspot.com",
  messagingSenderId: "493096079983",
  appId: "1:493096079983:web:882fda39371d64cc1ab39a",
  measurementId: "G-CDK7C1X6GN",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
