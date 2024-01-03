import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import * as adminFirestore from "firebase-admin/firestore";
import admin, { ServiceAccount } from "firebase-admin";

const firebaseConfig = {
  apiKey: "AIzaSyDd8DoMdMIgK7axANLIbrki40SpJ7BWaik",
  authDomain: "socratica-c39e6.firebaseapp.com",
  projectId: "socratica-c39e6",
  storageBucket: "socratica-c39e6.appspot.com",
  messagingSenderId: "964081933514",
  appId: "1:964081933514:web:817ec943d479cace506833",
  measurementId: "G-7WQCF6M58L"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;