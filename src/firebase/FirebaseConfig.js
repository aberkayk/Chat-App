// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcfzwnsj5fU54roPrswG9xWi9g_wAPMps",
  authDomain: "chatapp-96586.firebaseapp.com",
  projectId: "chatapp-96586",
  storageBucket: "chatapp-96586.appspot.com",
  messagingSenderId: "712904204047",
  appId: "1:712904204047:web:e478e90322065c5063a87a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)