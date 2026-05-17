
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interviewagent-4ce1f.firebaseapp.com",
  projectId: "interviewagent-4ce1f",
  storageBucket: "interviewagent-4ce1f.firebasestorage.app",
  messagingSenderId: "837571382785",
  appId: "1:837571382785:web:713b8acd213190090a7a00"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth , provider}