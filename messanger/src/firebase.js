import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  // config
});

const db = firebaseApp.firestore();

export default db;
