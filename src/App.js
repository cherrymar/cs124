// React imports
import { useState } from 'react';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';


// Firebase imports 
import firebase from "firebase/compat";
import {useCollection} from "react-firebase-hooks/firestore";

// Local imports
import CustomDropdown from './components/CustomDropdown';
import BackButton from './components/MultiList/BackButton';

import SelectListDesktop from './components/MultiList/SelectListDesktop';
import SelectListMobile from './components/MultiList/SelectListMobile';
import TaskDetailView from './TaskDetailView';


import './App.css';
import { devices } from './components/Design';
import { FamilyRestroomOutlined } from '@mui/icons-material';

// Set up Firebase
const firebaseConfig = {
  // apiKey: "AIzaSyCd9qqxvMpEKpBzwfWcc2tlRFa6ICaLH_s",
  // authDomain: "hmc-cs124-fa21-labs.firebaseapp.com",
  // projectId: "hmc-cs124-fa21-labs",
  // storageBucket: "hmc-cs124-fa21-labs.appspot.com",
  // messagingSenderId: "949410042946",
  // appId: "1:949410042946:web:0113b139a7e3cd1cc709db"

  apiKey: "AIzaSyBHZdLi79neEirMDn9HeYqOIO_7D7CMMxk",
  authDomain: "tasks-dce66.firebaseapp.com",
  projectId: "tasks-dce66",
  storageBucket: "tasks-dce66.appspot.com",
  messagingSenderId: "630175576796",
  appId: "1:630175576796:web:0ba0f2ad21deee6c723a19",
  measurementId: "G-TGMZJRZF5Y"
};
firebase.initializeApp(firebaseConfig);

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = firebase.firestore();
const SUBCOLLECTION = "cherrymar-tasks";
const COLLECTION = "cherrymar-tasks-lists";


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

function App() {
  // Hooks for managing view state
  const [listId, setListId] = useState(null); // tracks which list user is viewing
  const [listName, setListName] = useState(null);
  const [onMenuView, setOnMenuView] = useState(true); // On left tab if true, on right tab if false
  const [sortView, setSortView] = useState("dateCreated");

  const isMobile = useMediaQuery({maxWidth: 600})

  let hasCompleted = FamilyRestroomOutlined

  let taskListQuery = db.collection(COLLECTION).orderBy("name");
  const [allTaskListsValue, allTaskListsLoading, allTaskListsError] = useCollection(taskListQuery);

  let taskListData = [];
  if (!allTaskListsLoading && allTaskListsValue) {
    taskListData = allTaskListsValue.docs.map((doc) => doc.data());
  }


  // Helper functions
  function handleAddTaskList(name, id) {
    db.collection(COLLECTION).doc(id).set(
      {
        id: id,
        name: name,
      }
    );
  }

  function handleDeleteTaskList(id) {
    db.collection(COLLECTION).doc(id).delete();
  }


  return (
    <div className="App">
          {
            isMobile ? 
              onMenuView ? 
              
              <>
                <SelectListMobile 
                  tasksLists={taskListData} 
                  onSetListId={setListId} 
                  onSetOnMenuView={setOnMenuView} 
                  onHandleAddTaskList={handleAddTaskList}
                  onHandleDeleteTaskList={handleDeleteTaskList}
                  onSetListName={setListName}
                />
              </>
              :
              <>
                
                <ContentContainer>
                <Header>
                  <BackButton aria-label="Return to task lists" onSetOnMenuView={setOnMenuView}/> 
                  <CustomDropdown aria-label="Sort View Dropdown" onSelectView={setSortView} sortByOptions={sortByOptions}/>
                </Header>
                <Title aria-label={listName}>{listName}</Title>
                <TaskDetailView
                  listId={listId}
                  listName={listName}
                  disabled={!hasCompleted} 
                  sortView={sortView} 
                  db={db}
                />
                </ContentContainer>
                
              </>
              :
              <DestkopContainer>
                <ListContainer>
                  <SelectListDesktop
                    tasksLists={taskListData} 
                    onSetListId={setListId} 
                    onSetOnMenuView={setOnMenuView} 
                    onHandleAddTaskList={handleAddTaskList}
                    onHandleDeleteTaskList={handleDeleteTaskList}
                    onSetListName={setListName}
                  />
                </ListContainer>
                <ContentContainer>
                  <Header>
                      <Title aria-label="Tasks">{listName}</Title>
                      <CustomDropdown aria-label="Sort View Dropdown" onSelectView={setSortView} sortByOptions={sortByOptions}/>
                  </Header>
                
                  {listId &&
                
                    <TaskDetailView
                    sortView={sortView} 
                    listId={listId}
                    listName={listName}
                    disabled={!hasCompleted} 
                    db={db}
                  />
                  }
                  
                </ContentContainer>  
                
              </DestkopContainer>

          }
    </div>
    
  );
}

export default App;