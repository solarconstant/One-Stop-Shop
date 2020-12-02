import firebase from 'firebase/app';
import 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAil1JtJakDkePeQMEwSTuxdVIZsHL1Wyg",
    authDomain: "ecommerce-7f081.firebaseapp.com",
    databaseURL: "https://ecommerce-7f081.firebaseio.com",
    projectId: "ecommerce-7f081",
    storageBucket: "ecommerce-7f081.appspot.com",
    messagingSenderId: "842487448322",
    appId: "1:842487448322:web:1002c73ec62ba4f286b81b",
    measurementId: "G-HDCXNRT0MW"
  };

  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();