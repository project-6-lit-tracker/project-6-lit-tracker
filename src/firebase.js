import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBtLoVzO1Xn8IXq4f-lG6kG6eNvRTQ9Fmo",
    authDomain: "project6-lit-tracker-second.firebaseapp.com",
    databaseURL: "https://project6-lit-tracker-second.firebaseio.com",
    projectId: "project6-lit-tracker-second",
    storageBucket: "project6-lit-tracker-second.appspot.com",
    messagingSenderId: "52269660447",
    appId: "1:52269660447:web:9b5949ed12bfd88fef182a",
    measurementId: "G-843HB9XSW1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
