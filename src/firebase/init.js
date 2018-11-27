import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Initialize Firebase
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyANvdnkZjMsFVIDAbrCAf3TgqZZgFQIU9M",
    authDomain: "recepies-86e8b.firebaseapp.com",
    databaseURL: "https://recepies-86e8b.firebaseio.com",
    projectId: "recepies-86e8b",
    storageBucket: "recepies-86e8b.appspot.com",
    messagingSenderId: "61335811040"
  };
  const firebaseApp = firebase.initializeApp(config);
 
firebaseApp.firestore().settings({ timestampsInSnapshots: true })

// export firestore database
export default firebaseApp.firestore()