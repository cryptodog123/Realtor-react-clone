// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkhUrp6VcOoXSXR9SDBf8qeHMCp9X1p-I",
  authDomain: "realtor-react-app-557a3.firebaseapp.com",
  projectId: "realtor-react-app-557a3",
  storageBucket: "realtor-react-app-557a3.appspot.com",
  messagingSenderId: "1008676072659",
  appId: "1:1008676072659:web:17f3fb688686d8b1fd7826",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
