import firebase from 'firebase'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyBnLYEFDKifJ63PD-rFTzXVixGhr4Wei1w",
    authDomain: "shoppingmall-a2bd5.firebaseapp.com",
    projectId: "shoppingmall-a2bd5",
    storageBucket: "shoppingmall-a2bd5.appspot.com",
    messagingSenderId: "225253520018",
    appId: "1:225253520018:web:528921ee33206e0c8f2c4b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();
  const fireStore = firebase.firestore();
  const timestamp = firebase.firestore.FieldValue.serverTimestamp

//   export {projectStorage, projectFireStore, timestamp}
  export  {storage, fireStore};