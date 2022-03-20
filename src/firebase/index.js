// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCV6fJF1WZV1gtVpFIXqBVNJI3FXb3sPFg",
  authDomain: "water-maps-vue.firebaseapp.com",
  projectId: "water-maps-vue",
  storageBucket: "water-maps-vue.appspot.com",
  messagingSenderId: "676075504880",
  appId: "1:676075504880:web:4d0d076d925e95aa18ee35",
  measurementId: "G-VGP39LL6JQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth, analytics };
