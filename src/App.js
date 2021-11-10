// React imports
import { useState } from 'react';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import styled from 'styled-components';

// Firebase imports 
import firebase from "firebase/compat";
import {useCollection} from "react-firebase-hooks/firestore";

// Local imports
// import TaskList from './components/TaskList';
import NewTask from './components/Tasks/NewTask';
import DeleteAllCompletedButton from './components/DeleteAllCompletedButton';
// import ViewSelector from './components/ViewSelector';
import TabList from './components/Tabs/TabList';
import TasksSortedList from './components/Tasks/TasksSortedList';
import CustomDropdown from './components/CustomDropdown';

import './App.css';
import { devices } from './components/Design';

// Set up Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCd9qqxvMpEKpBzwfWcc2tlRFa6ICaLH_s",
  authDomain: "hmc-cs124-fa21-labs.firebaseapp.com",
  projectId: "hmc-cs124-fa21-labs",
  storageBucket: "hmc-cs124-fa21-labs.appspot.com",
  messagingSenderId: "949410042946",
  appId: "1:949410042946:web:0113b139a7e3cd1cc709db"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const collection = "cherrymar-tasks";


// Create custom styled components
const Container = styled.div`

  // @media ${devices.mobileS} { 
  //   max-width: 90vw;
  // }

  // @media ${devices.laptop} { 
  //   max-width: 1000px;
  // }

  // @media ${devices.desktop} { 
  //   max-width: 2000px;
  // }

  max-width: 90vw;
  margin: 5% auto;

`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
  height: 10vh;
`;

const Body = styled.div`
// vertical-align: top;
  @media ${devices.mobileS} { 
    // font-size: 10vw;
  }

  @media ${devices.laptop} { 
    font-size: 2vw;
  }

  @media ${devices.desktop} { 
    font-size: 3vw;
  }
  height: 75vh;
  z-index: 1;
  ::-webkit-scrollbar {
    display: none;
  }
  margin: 10px 0;
`
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
  // font-size: 10vw;
  font-weight: 700;
  text-align: left;
`;


function App() {
  // Hooks for managing view state
  const [view, setView] = useState("dateCreated");

  let hasCompleted = false

  // Retrieve data from Firebase
  let query;
  if (view === "priority") {
    query = db.collection(collection).orderBy(view, "desc");
  } else {
    query = db.collection(collection).orderBy(view);

  }
  
  const [value, loading, error] = useCollection(query);

  const sortByOptions = {
    "dateCreated" : "Date Created", 
    "priority" : "Priority", 
    "description" : "Description",
  }
  const options = ['dateCreated', 'priority', 'description'];
  
  // Helper functions
  function handleDeleteTask(taskId) {
    db.collection(collection).doc(taskId).delete();
  }

  function handleAddTask(description, priority, dueDate) {
    const id = generateUniqueID();
    db.collection(collection).doc(id).set(
      {
        id: id,
        description: description,
        completed: false,
        priority: priority, 
        dateCreated: firebase.firestore.Timestamp.now(),
        // dateDue: dueDate
      }
    )
  }

  function handleTaskFieldChanged(taskId, field, value) {
    db.collection(collection).doc(taskId).update({[field]: value});
  }

  async function handleDeleteAllCompletedTasks() {
    const tasksRef = db.collection(collection);
    const snapshot = await tasksRef.where('completed', '==', true).get();
    snapshot.forEach(doc => {
      db.collection(collection).doc(doc.id).delete();
    });

    // Just deleted all completed tasks
    hasCompleted = false;
  }


  if (!loading && value) {
      let data = value.docs.map((doc) => doc.data())
      hasCompleted = data.filter(task => task.completed).length !== 0
  }


  return (
    <>
        <Container className="App">
          <Header>
            <Title>Tasks</Title>
            <CustomDropdown onSelectView={setView} sortByOptions={sortByOptions}/>
          </Header>

          <Body>
            <NewTask onAddTask={handleAddTask}/>
          
            <TabList>
              <div key="All">
                <TasksSortedList 
                  sortView={view} 
                  query={query} 
                  loading={loading} 
                  value={value} 
                  view={"All"} 
                  error={error} 
                  handleTaskFieldChanged={handleTaskFieldChanged} 
                  handleDeleteTask={handleDeleteTask}
                />
              </div>
              <div key="Done">
                <TasksSortedList 
                  sortView={view} 
                  query={query} 
                  loading={loading} 
                  value={value} 
                  view={"Complete"} 
                  error={error} 
                  handleTaskFieldChanged={handleTaskFieldChanged} 
                  handleDeleteTask={handleDeleteTask}
                />
              </div>
              <div key="In Progress">
                <TasksSortedList 
                  sortView={view} 
                  query={query} 
                  loading={loading} 
                  value={value} 
                  view={"Incomplete"} 
                  error={error} 
                  handleTaskFieldChanged={handleTaskFieldChanged} 
                  handleDeleteTask={handleDeleteTask}
                />
              </div>
            </TabList>
          </Body>

          <DeleteAllCompletedButton disabled={!hasCompleted} onDeleteAllCompletedTasks={handleDeleteAllCompletedTasks}/>
        </Container>  
    </>
    
  );
}

export default App;