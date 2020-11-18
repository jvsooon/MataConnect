import * as firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyD8x-yTelJNNpbYX1dx2fk5vLn6IUtL2Ao",
    authDomain: "fir-f8e7f.firebaseapp.com",
    databaseURL: "https://fir-f8e7f.firebaseio.com",
    projectId: "fir-f8e7f",
    storageBucket: "fir-f8e7f.appspot.com",
    messagingSenderId: "724386342409",
    appId: "1:724386342409:web:32388e85623a6ad147fad8",
    measurementId: "G-D55VC2W5GL"
  };
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  // firebase.analytics();
  export default firebase