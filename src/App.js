// React imports
import { useState } from 'react';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import styled from 'styled-components';

// Firebase imports 
import firebase from "firebase/compat";
import {useCollection} from "react-firebase-hooks/firestore";

// Local imports
import NewTask from './components/Tasks/NewTask';
import DeleteAllCompletedButton from './components/DeleteAllCompletedButton';
import TabList from './components/Tabs/TabList';
import TasksSortedList from './components/Tasks/TasksSortedList';
import CustomDropdown from './components/CustomDropdown';
import Menu from './components/MultiList/Menu';

import SelectListMenu from './components/MultiList/SelectListMenu';
import SelectList from './components/MultiList/SelectList';
import TaskDetailView from './TaskDetailView';
// import useWindowDimensions from './UseWindowDimensions';


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

  @media ${devices.mobileS} { 
    max-width: 90vw;
  }

  @media ${devices.laptop} { 
    max-width: 1000px;
  }

  @media ${devices.desktop} { 
    max-width: 2000px;
  }

  // max-width: 90vw;
  height: 95vh;
  margin: auto auto;
  
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
  height: 10%;
`;

const Body = styled.div`
  @media ${devices.mobileS} { 
    // font-size: 10vw;
    margin: 5px;
  }

  @media ${devices.laptop} { 
    font-size: 2vw;
    margin: 10px;
  }

  @media ${devices.desktop} { 
    font-size: 3vw;
    margin: 10px;
  }


  height: 75%;
  z-index: 1;

  ::-webkit-scrollbar {
    display: none;
  }
  // margin: 10px 0;
  // height: 80%;
`

const Footer = styled.div`
  @media ${devices.mobileS} { 
    // font-size: 10vw;
    margin: 5px;
  }

  @media ${devices.laptop} { 
    font-size: 2vw;
    margin: 10px;
  }

  @media ${devices.desktop} { 
    font-size: 3vw;
    margin: 10px;
  }


  height: 75%;
  z-index: 1;

  ::-webkit-scrollbar {
    display: none;
  }
  // margin: 10px 0;
  // height: 80%;
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


const TasksLists = ["Tasks", "Birthday", "Homework", "Chores"];


function App() {
  // console.log(useWindowDimensions())
  // const { height, width } = useWindowDimensions();
  // Hooks for managing view state
  const [sortView, setSortView] = useState("dateCreated");
  const [filterView, setFilterView] = useState("dateCreated");
  const [listView, setListView] = useState("Tasks"); // tracks which list user is viewing
  const [onModalView, setOnModalView] = useState(window.innerWidth > 800); // Menu on left if true, menu bar on bottom  if false
  const [onMenuView, setOnMenuView] = useState(true); // On left tab if true, on right tab if false

  // console.log(onModalView)
  let hasCompleted = false
  

  // Retrieve data from Firebase
  let query;
  if (sortView === "priority") {
    query = db.collection(collection).orderBy(sortView, "desc");
  } else {
    query = db.collection(collection).orderBy(sortView);
  }
  
  const [value, loading, error] = useCollection(query);

  const sortByOptions = {
    "dateCreated" : "Date Created", 
    "priority" : "Priority", 
    "description" : "Description",
  }
  
  // Helper functions
  function handleDeleteTask(taskId) {
    db.collection(collection).doc(taskId).delete();
  }

  function handleAddTask(description, priority) {
    const id = generateUniqueID();
    db.collection(collection).doc(id).set(
      {
        id: id,
        description: description,
        completed: false,
        priority: priority, 
        dateCreated: firebase.firestore.Timestamp.now(),
        list: listView,
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


  let data;
  if (!loading && value) {
      data = value.docs.map((doc) => doc.data())
      hasCompleted = data.filter(task => task.completed).length !== 0

      // let data = props.value.docs.map((doc) => doc.data())
      if (filterView === "Done") {
          data = data.filter((doc) => doc.completed);
      } else if (filterView === "In Progress") {
          data = data.filter((doc) => !doc.completed);
      }
  } else {
    data = []
  }

  // console.log(window.innerHeight);
  // console.log(window.innerWidth);

  return (
    <>
        <Container className="App" aria-hidden={true}>
          <TaskDetailView 
            onSelectView={setSortView} 
            sortByOptions={sortByOptions}
            onAddTask={handleAddTask}
            onTabChange={setFilterView}
            data={data}
            handleTaskFieldChanged={handleTaskFieldChanged} 
            handleDeleteTask={handleDeleteTask}
            disabled={!hasCompleted} 
            onDeleteAllCompletedTasks={handleDeleteAllCompletedTasks}
          />
          {/* <Header>
            <Title aria-label="Tasks" >Tasks</Title>
            <CustomDropdown aria-label="Sort View Dropdown" onSelectView={setSortView} sortByOptions={sortByOptions}/>
          </Header>

          <Body> */}
            {/* <NewTask aria-label="Add a new task" onAddTask={handleAddTask}/>
          
            <TabList aria-label="Filter view options tab" onTabChange={setFilterView}>
              <div key="All">
                <TasksSortedList
                  aria-label="View all tasks"
                  data={data}
                  handleTaskFieldChanged={handleTaskFieldChanged} 
                  handleDeleteTask={handleDeleteTask}
                />
              </div>
              <div key="Done">
                <TasksSortedList
                  aria-label="View done tasks"
                  data={data}
                  handleTaskFieldChanged={handleTaskFieldChanged} 
                  handleDeleteTask={handleDeleteTask}
                />
              </div>
              <div key="In Progress">
                <TasksSortedList
                  aria-label="View in progress tasks"
                  data={data}
                  handleTaskFieldChanged={handleTaskFieldChanged} 
                  handleDeleteTask={handleDeleteTask}
                />
              </div>
            </TabList> */}
          {/* </Body> */}

          

          {/* <DeleteAllCompletedButton 
            disabled={!hasCompleted} 
            onDeleteAllCompletedTasks={handleDeleteAllCompletedTasks}
          /> */}
          {
            onModalView ? 
              <SelectList tasksLists={TasksLists} onSetListView={setListView}/>
              :
              <Menu onSelectListView={setListView} />
          }

          

          
        </Container>  
    </>
    
  );
}

export default App;