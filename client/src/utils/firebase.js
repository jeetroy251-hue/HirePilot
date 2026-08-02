import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAwCWWUT_3YneewCkUC_fTRM7kweQQIYnA",
  authDomain: "hirepilot-812c5.firebaseapp.com",
  projectId: "hirepilot-812c5",
  storageBucket: "hirepilot-812c5.firebasestorage.app",
  messagingSenderId: "816356934371",
  appId: "1:816356934371:web:d0be3ac64d7ed31a4e7bd6",
  measurementId: "G-E99Q8PZRYG"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();