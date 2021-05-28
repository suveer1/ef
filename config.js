import firebase from 'firebase';
require('@firebase/firestore');

  var firebaseConfig = {
    apiKey: "AIzaSyB2LC3Ua512bUKdSeoqj94s61rf8y9Xtrw",
    authDomain: "bidingapp-a7daa.firebaseapp.com",
    projectId: "bidingapp-a7daa",
    storageBucket: "bidingapp-a7daa.appspot.com",
    messagingSenderId: "960071690656",
    appId: "1:960071690656:web:44405859d0860eee4edcc5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();