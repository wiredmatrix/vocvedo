import * as firebase from 'firebase';
import 'firebase/storage'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDkal_WzEJHgBcfXCsJRJT7D7qQFbM-kic",
    authDomain: "voctest-ea7a6.firebaseapp.com",
    databaseURL: "https://voctest-ea7a6.firebaseio.com",
    projectId: "voctest-ea7a6",
    storageBucket: "voctest-ea7a6.appspot.com",
    messagingSenderId: "905605957841",
    appId: "1:905605957841:web:0f5dd63b62f5fae6ed5df0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  export { storage, firebase as default };