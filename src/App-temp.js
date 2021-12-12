// React imports
// import { useState } from 'react';
import styled from 'styled-components';
// import { useMediaQuery } from 'react-responsive';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

// Firebase imports 
import firebase from "firebase/compat";
import {useCollection} from "react-firebase-hooks/firestore";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword
} from 'react-firebase-hooks/auth';

// Local imports
import SignIn from './components/LogIn/LogInForm';

// import CustomDropdown from './components/CustomDropdown';
// import BackButton from './components/MultiList/BackButton';

// import SelectListDesktop from './components/MultiList/SelectListDesktop';
// import SelectListMobile from './components/MultiList/SelectListMobile';
// import TaskDetailView from './components/TaskDetailView';
// import TabList from './components/Tabs/TabList';
// import LandingPage from './components/LandingPage';

import './App.css';
import { devices } from './components/Design';


// Set up Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBHZdLi79neEirMDn9HeYqOIO_7D7CMMxk",
  authDomain: "tasks-dce66.firebaseapp.com",
  projectId: "tasks-dce66",
  storageBucket: "tasks-dce66.appspot.com",
  messagingSenderId: "630175576796",
  appId: "1:630175576796:web:0ba0f2ad21deee6c723a19",
  measurementId: "G-TGMZJRZF5Y"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Set up authentication
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();


const SUB2COLLECTION_TASKS = "cherrymar-tasks-authentication";
const SUBCOLLECTION_TASKS_LISTS = "cherrymar-tasks-lists-authentication";
const COLLECTION_PEOPLE = "People";


export default function App(props) {
  // Helper functions
  function handleAddTaskList(name, id) {
    // db.collection(COLLECTION).doc(id).set(
    //   {
    //     id: id,
    //     name: name,
    //   }
    // );
  }

  async function handleDeleteTaskList(id) {
    // const snapshot = await db.collection(COLLECTION).doc(id).collection(SUBCOLLECTION).get();
    // snapshot.forEach(doc => {
    //   db.collection(COLLECTION).doc(id).collection(SUBCOLLECTION).doc(doc.id).delete();
    // });
    // db.collection(COLLECTION).doc(id).delete();
  }


  // Login
  const [user, loading, error] = useAuthState(auth);

  function verifyEmail() {
      auth.currentUser.sendEmailVerification();
  }

  if (loading) {
      return <p>Checking...</p>;
  } else if (user) {
      return <div>
          {user.displayName || user.email}
          <SignedInApp {...props} user={user}/>
          <button type="button" onClick={() => auth.signOut()}>Logout</button>
          {!user.emailVerified && <button type="button" onClick={verifyEmail}>Verify email</button>}
      </div>
  } else {
      return <>
          {error && <p>Error App: {error.message}</p>}
          <TabList>
              <SignIn key="Sign In"/>
              <SignUp key="Sign Up"/>
          </TabList>
      </>
  }
}