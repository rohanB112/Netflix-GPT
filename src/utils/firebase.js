// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwKaCjwhY5DCr2LltqUoLUusQo9gLi1NI",
  authDomain: "netflixgpt-59623.firebaseapp.com",
  projectId: "netflixgpt-59623",
  storageBucket: "netflixgpt-59623.appspot.com",
  messagingSenderId: "899713301337",
  appId: "1:899713301337:web:d8d99e4ef747e5fd906a48",
  measurementId: "G-6HCRKVVFQN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
