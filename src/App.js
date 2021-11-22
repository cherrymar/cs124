// React imports
import { useState } from 'react';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';


// Firebase imports 
import firebase from "firebase/compat";
import {useCollection} from "react-firebase-hooks/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// const {  Timestamp, FieldValue } = require('firebase-admin/firestore');

// Local imports
import NewTask from './components/Tasks/NewTask';
import DeleteAllCompletedButton from './components/DeleteAllCompletedButton';
import TabList from './components/Tabs/TabList';
import TasksSortedList from './components/Tasks/TasksSortedList';
import CustomDropdown from './components/CustomDropdown';
import BackButton from './components/MultiList/BackButton';

// import SelectListMenu from './components/MultiList/SelectListMenu';
import SelectListDesktop from './components/MultiList/SelectListDesktop';
import SelectListMobile from './components/MultiList/SelectListMobile';
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

  // apiKey: "AIzaSyBQ-L6YGO4GE_XdNapz4M7VC7j4TM4Mwqc",
  // authDomain: "tasks-24209.firebaseapp.com",
  // projectId: "tasks-24209",
  // storageBucket: "tasks-24209.appspot.com",
  // messagingSenderId: "178699163025",
  // appId: "1:178699163025:web:d99e91b297b2b8ef2b7630",
  // measurementId: "G-FY6X078NY7"
};
firebase.initializeApp(firebaseConfig);

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = firebase.firestore();
const allTasksCollection = "cherrymar-tasks";
const allTaskListsCollection = "cherrymar-tasks-lists";


// Create custom styled components
const Container = styled.div`

  @media ${devices.mobileS} { 
    max-width: 90vw;
  }

  @media ${devices.laptop} { 
    // max-width: 1000px;
    width: 90%;
    grid-column-start: 2;
    grid-column-end: 2;
  }

  @media ${devices.desktop} { 
    // max-width: 2000px;
    width: 90%;
    grid-column-start: 2;
    grid-column-end: 2;
  }

  // max-width: 90vw;
  height: 95vh;
  margin: auto auto;
  
`

const DestkopContainer = styled.div`

  @media ${devices.laptop} { 
    // max-width: 1000px;
  }

  @media ${devices.desktop} { 
    // max-width: 2000px;
  }
  
  display: grid;
  grid-template-columns: 20% 80%;
  grid-template-rows: 1;
`

const ListContainer = styled.div`
  grid-column-start: 1;
  grid-column-end: 1;
  // background: lightgray;
  border-right: solid;
  height: 100%;
`;

const ContentContainer = styled.div`
  grid-column-start: 2;
  grid-column-end: 2;
`;

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


const TasksLists = ["Tasks", "Birthday"];


function App() {
  // console.log(useWindowDimensions())
  // const { height, width } = useWindowDimensions();
  // Hooks for managing view state
  const [sortView, setSortView] = useState("dateCreated");
  const [filterView, setFilterView] = useState("dateCreated");
  const [listView, setListView] = useState("Tasks"); // tracks which list user is viewing
  const [onMenuView, setOnMenuView] = useState(true); // On left tab if true, on right tab if false

  const isMobile = useMediaQuery({maxWidth: 600})

  // console.log(onModalView)
  let hasCompleted = false
  // let collection;
  // collection = collection + listView;
  

  // Retrieve data from Firebase
  let allTasksQuery;
  if (sortView === "priority") {
    allTasksQuery = db.collection(allTasksCollection).orderBy(sortView, "desc");
  } else {
    allTasksQuery = db.collection(allTasksCollection).orderBy(sortView);
  }
  const [allTasksValue, allTasksLoading, allTasksError] = useCollection(allTasksQuery);


  let allTaskListsQuery;
  allTaskListsQuery = db.collection(allTaskListsCollection).orderBy("listName", "desc");
  const [allTaskListsValue, allTaskListsLoading, allTaskListsError] = useCollection(allTaskListsQuery);
  console.log(allTaskListsValue);
  // Options for sorting the task list
  const sortByOptions = {
    "dateCreated" : "Date Created", 
    "priority" : "Priority", 
    "description" : "Description",
  }
  

  // Helper functions
  function handleDeleteTask(taskId) {
    db.collection(allTasksCollection).doc(taskId).delete();
    db.collection(allTaskListsCollection).doc(listView).update({["ids"]: []});
  }

  function handleAddTask(description, priority) {
    const id = generateUniqueID();
    db.collection(allTasksCollection).doc(id).set(
      {
        id: id,
        description: description,
        completed: false,
        priority: priority, 
        dateCreated: firebase.firestore.Timestamp.now(),
        // dateDue: dueDate
      }
    );
    db.collection(allTaskListsCollection).doc(listView).update({["ids"]: firebase.firestore.FieldValue.arrayUnion(id)});
  }

  function handleAddTaskList(name) {
    const id = generateUniqueID();
    db.collection(allTaskListsCollection).doc(id).set(
      {
        id: id,
        ids: [],
        name: name,
      }
    );
  }

  function handleTaskFieldChanged(taskId, field, value) {
    db.collection(allTasksCollection).doc(taskId).update({[field]: value});
  }

  async function handleDeleteAllCompletedTasks() {
    // const tasksRef = db.collection(allTasksCollection);
    const snapshot = await allTasksQuery.where('completed', '==', true).get();
    snapshot.forEach(doc => {
      db.collection(allTasksCollection).doc(doc.id).delete();
      db.collection(allTaskListsCollection).doc(listView).update({["ids"]: firebase.firestore.FieldValue.arrayRemove(doc.id)});
    });
  }


  let data;
  let taskLists;

  if (!allTasksLoading && allTasksValue && !allTaskListsLoading && allTaskListsValue) {


      let taskIds = allTaskListsValue.docs.map((doc) => doc.data())//.filter((doc) => doc.name == listView).ids;
      console.log(taskIds)
      data = allTasksValue.docs.map((doc) => doc.data())//.filter((doc) => taskIds.contains(doc.id));
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
        {/* <Container className="App" aria-hidden={true}>
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
          /> */}
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
            isMobile ? 
              onMenuView ? 
              
              <>
                <SelectListMobile tasksLists={TasksLists} onSetListView={setListView} onSetOnMenuView={setOnMenuView}/>
                {/* <Menu onSetOnMenuView={setOnMenuView} />  */}
              </>
              :
              <>
                <BackButton onSetOnMenuView={setOnMenuView}/> 
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
                
              </>
              :
              <DestkopContainer>
                <ListContainer>
                  <SelectListDesktop tasksLists={TasksLists} onSetListView={setListView} onHandleAddTaskList={handleAddTaskList}/>
                </ListContainer>
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
                </Container>  
                
              </DestkopContainer>

          }

          
        {/* </Container>  */}
          
        
    </>
    
  );
}

export default App;