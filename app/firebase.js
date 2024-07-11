// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-Y_qRxcIWhR7A8kOWfHRti2g6qbz4mb8",
  authDomain: "sendin-7babd.firebaseapp.com",
  projectId: "sendin-7babd",
  storageBucket: "sendin-7babd.appspot.com",
  messagingSenderId: "319024898214",
  appId: "1:319024898214:web:8081b812c4aa6afef79467",
  measurementId: "G-Z3PKX0ZJYB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);