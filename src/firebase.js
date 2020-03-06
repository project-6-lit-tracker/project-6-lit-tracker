// firebase.js
import firebase from 'firebase';

// Initialize Firebase
// USE YOUR CONFIG OBJECT
const config = {
    apiKey: "AIzaSyD_3aQWQ3rO4YJO5R7EHj1v8Q6gfjAJaWk",
    authDomain: "project-6-lit-tracker.firebaseapp.com",
    databaseURL: "https://project-6-lit-tracker.firebaseio.com",
    projectId: "project-6-lit-tracker",
    storageBucket: "project-6-lit-tracker.appspot.com",
    messagingSenderId: "739658073151",
    appId: "1:739658073151:web:e487069fdf5b98da14648a"
};
firebase.initializeApp(config);

// this exports the CONFIGURED version of firebase
export default firebase;