import { useState } from 'react';
import styled from 'styled-components';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";


// Firebase imports 
import firebase from "firebase/compat";
import {useCollection} from "react-firebase-hooks/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";



import NewTask from './components/Tasks/NewTask';
import TabList from './components/Tabs/TabList';
import TasksSortedList from './components/Tasks/TasksSortedList';
import CustomDropdown from './components/CustomDropdown';
import DeleteAllCompletedButton from './components/DeleteAllCompletedButton';


import { devices } from './components/Design';


// const db = firebase.firestore();
const SUBCOLLECTION = "cherrymar-tasks";
const COLLECTION = "cherrymar-tasks-lists";


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



export default function TaskDetailView(props){
  
  const [filterView, setFilterView] = useState("dateCreated");
  let hasCompleted = false;


  let tasksQuery;
  if (props.sortView === "priority") {
    tasksQuery = props.db.collection(COLLECTION).doc(props.listId).collection(SUBCOLLECTION).orderBy(props.sortView, "desc");
  } else {
    tasksQuery = props.db.collection(COLLECTION).doc(props.listId).collection(SUBCOLLECTION).orderBy(props.sortView);
  }
  const [allTasksValue, allTasksLoading, allTasksError] = useCollection(tasksQuery);

  let data = [];
  if (!allTasksLoading && allTasksValue) {
      data = allTasksValue.docs.map((doc) => doc.data())
      hasCompleted = data.filter((doc) => doc.completed).length != 0
      if (filterView === "Done") {
          data = data.filter((doc) => doc.completed);
      } else if (filterView === "In Progress") {
          data = data.filter((doc) => !doc.completed);
      }
  }



  // Helper functions
  function handleDeleteTask(taskId) {
    props.db.collection(COLLECTION).doc(props.listId).collection(SUBCOLLECTION).doc(taskId).delete();
  }

  function handleAddTask(description, priority) {
    const id = generateUniqueID();
    props.db.collection(COLLECTION).doc(props.listId).collection(SUBCOLLECTION).doc(id).set({
        id: id,
        description: description,
        completed: false,
        priority: priority, 
        dateCreated: firebase.firestore.Timestamp.now(),
    });
  }


  function handleTaskFieldChanged(taskId, field, value) {
    props.db.collection(COLLECTION).doc(props.listId).collection(SUBCOLLECTION).doc(taskId).update({[field]: value});
  }

  async function handleDeleteAllCompletedTasks() {
    // const tasksRef = props.db.collection(allTasksCollection);
    const snapshot = await tasksQuery.where('completed', '==', true).get();
    snapshot.forEach(doc => {
      props.db.collection(COLLECTION).doc(props.listId).collection(SUBCOLLECTION).doc(doc.id);
    });
  }


    return (
        <>
            {/* <Header>
                <Title aria-label="Tasks">{props.listName}</Title>
                <CustomDropdown aria-label="Sort View Dropdown" onSelectView={setSortView} sortByOptions={props.sortByOptions}/>
            </Header> */}
            
            <Body>
                <NewTask aria-label="Add a new task" onAddTask={handleAddTask}/>
                
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
                </TabList>

            </Body>
            
            <DeleteAllCompletedButton 
                disabled={!hasCompleted} 
                onDeleteAllCompletedTasks={handleDeleteAllCompletedTasks}
            />
        </>
    )
}