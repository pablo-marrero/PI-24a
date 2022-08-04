// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqWgmDcAJOstsNnMuSTTH6FwRIv_ttblg",
  authDomain: "api-country.firebaseapp.com",
  projectId: "api-country",
  storageBucket: "api-country.appspot.com",
  messagingSenderId: "635724279797",
  appId: "1:635724279797:web:a020e3ff99580535b4babc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)