import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth';
// import 'firebase/storage';

const config = {
  apiKey: "AIzaSyBHZdLi79neEirMDn9HeYqOIO_7D7CMMxk",
  authDomain: "tasks-dce66.firebaseapp.com",
  projectId: "tasks-dce66",
  storageBucket: "tasks-dce66.appspot.com",
  messagingSenderId: "630175576796",
  appId: "1:630175576796:web:0ba0f2ad21deee6c723a19",
  measurementId: "G-TGMZJRZF5Y"
}

firebase.initializeApp(config)
firebase.firestore()

// export const googleProvider = new firebase.auth.GoogleAuthProvider();
export default firebase;

