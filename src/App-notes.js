// React imports
import { useState } from 'react';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
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
import CustomDropdown from './components/CustomDropdown';
import BackButton from './components/MultiList/BackButton';

import SelectListDesktop from './components/MultiList/SelectListDesktop';
import SelectListMobile from './components/MultiList/SelectListMobile';
import TaskDetailView from './components/TaskDetailView';
import TabList from './components/Tabs/TabList';
import LandingPage from './components/LandingPage';

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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const SUBCOLLECTION = "cherrymar-tasks-authentication";
const COLLECTION = "cherrymar-tasks-lists-authentication";

const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();


// Create custom styled components
const Container = styled.div`


`;


const ContentContainer = styled.div`
  // max-width: 90vw;
  height: 95vh;
  margin: auto auto;

  @media ${devices.mobileS} { 
    height: 95vh;
    max-width: 90vw;
    margin: 5vw;
  }

  @media ${devices.laptop} { 
    // max-width: 1000px;
    height: 95vh;
    grid-column-start: 2;
    grid-column-end: 2;
    margin: 3vw;
  }

  @media ${devices.desktop} { 
    // max-width: 2000px;
    height: 95vh;
    grid-column-start: 2;
    grid-column-end: 2;
    margin: 3vw;
  }  
`

const DestkopContainer = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  grid-template-rows: 1;
`

const ListContainer = styled.div`
  grid-column-start: 1;
  grid-column-end: 1;
  border-right: solid;
  height: 100%;
`;



const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
  height: 10%;
`;



const Title = styled.div`
  @media ${devices.mobileS} { 
    font-size: 10vw;
  }

  @media ${devices.laptop} { 
    font-size: 5vw;
  }

  @media ${devices.desktop} { 
    font-size: 5vw;
  }
  font-weight: 700;
  text-align: left;
`;



// Options for sorting the task list
const sortByOptions = {
  "dateCreated" : "Date Created", 
  "priority" : "Priority", 
  "description" : "Description",
}

function App(props) {
  // Hooks for managing view state
  // const [listId, setListId] = useState(null); // tracks which list user is viewing
  // const [listName, setListName] = useState(null);
  // const [onMenuView, setOnMenuView] = useState(true); // On left tab if true, on right tab if false
  // const [sortView, setSortView] = useState("dateCreated");

  // const [user, userLoading, userError] = useAuthState(auth);

  // const isMobile = useMediaQuery({maxWidth: 600})

  // let taskListQuery = db.collection(COLLECTION).orderBy("name");
  // const [allTaskListsValue, allTaskListsLoading, allTaskListsError] = useCollection(taskListQuery);

  // let taskListData = [];
  // if (!allTaskListsLoading && allTaskListsValue) {
  //   taskListData = allTaskListsValue.docs.map((doc) => doc.data());
  // }


  // Helper functions
  function handleAddTaskList(name, id) {
    db.collection(COLLECTION).doc(id).set(
      {
        id: id,
        name: name,
      }
    );
  }

  async function handleDeleteTaskList(id) {
    const snapshot = await db.collection(COLLECTION).doc(id).collection(SUBCOLLECTION).get();
    snapshot.forEach(doc => {
      db.collection(COLLECTION).doc(id).collection(SUBCOLLECTION).doc(doc.id).delete();
    });
    db.collection(COLLECTION).doc(id).delete();
  }


  // Login
  const FAKE_EMAIL = 'foo@bar.com';
  const FAKE_PASSWORD = 'xyzzyxx';
  const collectionName = "People-AuthenticationRequired"

  let content;

  if (userLoading) {
    return content =  <p>Checking...</p>;
  } else if (user) {
      return <div>
          {user.displayName || user.email}
          <SignedInApp {...props} user={user}/>
          <button type="button" onClick={() => auth.signOut()}>Logout</button>
          {!user.emailVerified && <button type="button" onClick={verifyEmail}>Verify email</button>}
      </div>
  } else {
      return <>
          {userError && <p>Error App: {userError.message}</p>}
          <TabList>
              <SignIn key="Sign In"/>
              <SignUp key="Sign Up"/>
          </TabList>
          
      </>
  }
  

  function verifyEmail() {
    auth.currentUser.sendEmailVerification();
  }

  function SignIn() {
    const [
      signInWithEmailAndPassword,
      userCredential, loading, error
    ] = useSignInWithEmailAndPassword(auth);

    if (userCredential) {
      // Shouldn't happen because App should see that
      // we are signed in.
      return <div>Unexpectedly signed in already</div>
    } else if (loading) {
      return <p>Logging in…</p>
    }
    return <div>
      {error && <p>"Error logging in: " {error.message}</p>}
      <button onClick={() =>
        signInWithEmailAndPassword(FAKE_EMAIL, FAKE_PASSWORD)}>Login with test user Email/PW
      </button>
      <button onClick={() =>
        auth.signInWithPopup(googleProvider)}>Login with Google
      </button>
    </div>
  } 

function SignUp() {
  const [
    createUserWithEmailAndPassword,
    userCredential, loading, error
  ] = useCreateUserWithEmailAndPassword(auth);

  if (userCredential) {
    return <div>Unexpectedly signed in already</div>
  } else if (loading) {
    return <p>Signing up…</p>
  }
  return <div>
          {error && <p>"Error signing up: " {error.message}</p>}
          <button onClick={() =>
            createUserWithEmailAndPassword(FAKE_EMAIL, FAKE_PASSWORD)}>
            Create test user
          </button>
        </div>
}



function SignedInApp(props) {
  const query = db.collection(collectionName).where('owner', "==", props.user.uid);
  const [value, loading, error] = useCollection(query);

  function handleDeletePerson(personId) {
    db.collection(collectionName).doc(personId).delete().catch((error) => {
      console.error("Error deleting document: ", error);
    });
  }

  function handleAddPerson() {
    const newId = generateUniqueID();
    db.collection(collectionName).doc(newId).set({
      id: newId,
      name: "",
      email: "",
      phone: "",
      owner: props.user.uid
    }).catch((error) => {
      console.error("Error writing document: ", error);
    })
  }

  function handlePersonFieldChanged (personId, field, value) {
    // const person = people.find(p => p.id === personId);
    // if (person) {
    //   person[field] = value;
    // }
    // const doc = db.collection(collectionName).doc(personId);
    // doc.update({
    //   [field]: value,
    // }).catch((error) => {
    //   console.error("Error updating document: ", error);
    // })
  }

  let people = [];
  if (error) {
      return <p>error useCollection: {error.message}</p>
  }
  if (value) {
      people = [];// value.docs.map((doc) => {
      //     return {...doc.data()}
      // });
  }

  return <div>
      {loading && <h1>Loading</h1>}
      logged in
  </div>;
}
  

    
  
  

  return (
    <>
    {content}
    </>
    // <div className="App">
    //       {
    //         isMobile ? 
    //           onMenuView ? 
              
    //           <>
    //             <SelectListMobile 
    //               tasksLists={taskListData} 
    //               onSetListId={setListId} 
    //               onSetOnMenuView={setOnMenuView} 
    //               onHandleAddTaskList={handleAddTaskList}
    //               onHandleDeleteTaskList={handleDeleteTaskList}
    //               onSetListName={setListName}
    //             />
    //           </>
    //           :
    //           <>
                
    //             <ContentContainer>
    //             <Header>
    //               <BackButton aria-label="Return to task lists" onSetOnMenuView={setOnMenuView}/> 
    //               <CustomDropdown aria-label="Sort View Dropdown" onSelectView={setSortView} sortByOptions={sortByOptions}/>
    //             </Header>
    //             <Title aria-label={listName}>{listName}</Title>
    //             <TaskDetailView
    //               listId={listId}
    //               listName={listName}
    //               sortView={sortView} 
    //               db={db}
    //             />
    //             </ContentContainer>
                
    //           </>
    //           :
    //           <DestkopContainer>
    //             <ListContainer>
    //               <SelectListDesktop
    //                 tasksLists={taskListData} 
    //                 onSetListId={setListId} 
    //                 onSetOnMenuView={setOnMenuView} 
    //                 onHandleAddTaskList={handleAddTaskList}
    //                 onHandleDeleteTaskList={handleDeleteTaskList}
    //                 onSetListName={setListName}
    //               />
    //             </ListContainer>
    //             <ContentContainer>
    //               <Header>
    //                   <Title aria-label="Tasks">{listName}</Title>
    //                   <CustomDropdown aria-label="Sort View Dropdown" onSelectView={setSortView} sortByOptions={sortByOptions}/>
    //               </Header>
                
    //               {listId &&
                
    //                 <TaskDetailView
    //                 sortView={sortView} 
    //                 listId={listId}
    //                 listName={listName}
    //                 db={db}
    //               />
    //               }
                  
    //             </ContentContainer>  
                
    //           </DestkopContainer>

    //       }
    // </div>
    
  );
}

export default App;