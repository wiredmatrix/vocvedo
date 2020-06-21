import * as React from 'react';
import App from './App';
import firebase from "@react-native-firebase/app";
import Auth from '@react-native-firebase/auth';
import Storage from '@react-native-firebase/storage';


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
  if (firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  export {firebase, Auth, Storage};
  

function Setup() {
    return (
        <App />
    );
}

export default Setup;