import firebase from "firebase";
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyB3bXD_XGY0c4tGoJ2ums4wdi1ZaxcQYxI",
    authDomain: "fit-groove-5efdc.firebaseapp.com",
    projectId: "fit-groove-5efdc",
    storageBucket: "fit-groove-5efdc.appspot.com",
    messagingSenderId: "506795522514",
    appId: "1:506795522514:web:1a0db54818eb7851fcb00b",
    measurementId: "G-1XPTB04GVW"
  };

  let app;

  if(firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
  } else {
    app = firebase.app()
  }

  const db = app.firestore()
  const auth = firebase.auth()

  export {db, auth};