// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSfQFkEQzHFYGexy1GninoxMxKmYyMfM8",
  authDomain: "hale-treat-367616.firebaseapp.com",
  databaseURL: "https://hale-treat-367616-default-rtdb.firebaseio.com",
  projectId: "hale-treat-367616",
  storageBucket: "hale-treat-367616.appspot.com",
  messagingSenderId: "152772577362",
  appId: "1:152772577362:web:2eb07166452df7bb53378b",
  measurementId: "G-960KVCVQ90"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const firestore = getFirestore(app);