import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD84sEXA8vpYRUn-6qiwKGcTzwiftfNFyw",
  authDomain: "login-flow-c71bf.firebaseapp.com",
  projectId: "login-flow-c71bf",
  storageBucket: "login-flow-c71bf.firebasestorage.app",
  messagingSenderId: "436304725416",
  appId: "1:436304725416:web:824443e9c18bfc0bbbc99d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);