import { useState } from 'react';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import styled from 'styled-components';
// import Dropdown from 'react-dropdown';
// import { Dropdown } from 'semantic-ui-react'
import Select from "react-dropdown-select";
import Button from '@mui/material/Button';


import TaskList from './components/TaskList';
import NewTask from './components/NewTask';
import DeleteAllCompletedButton from './components/DeleteAllCompletedButton';
import ViewSelector from './components/ViewSelector';

import './App.css';

const Title = styled.div`
  font-size: 10vw;
  font-weight: 700;
  text-align: left;
`;

const Container = styled.div`
  margin: 5vw;
  height: 90vh;
  width: 90vw;
  z-index: 1;
`

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 2;
`;

function App(props) {
  
  const [data, setData] = useState(props.initialData);
  const [view, setView] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(data.filter(task => task.completed) !== []);
  

  function handleDeleteTask(taskId) {
      setData(data.filter(task => task.id !==taskId))
      setHasCompleted(data.filter(task => task.completed) !== []);
  }

  function handleAddTask(description) {
      setData([...data, {
          id: generateUniqueID(),
          description: description,
          completed: false
      }])
      setHasCompleted(data.filter(task => task.completed) !== []);
  }

  function handleTaskFieldChanged(taskId, field, value) {
      setData(data.map(
          task => task.id !== taskId
              ? task
              : {...task, [field]: value}))
      setHasCompleted(data.filter(task => task.completed) !== []);

      console.log(hasCompleted);
  }

  function handleDeleteAllCompletedTasks() {
    setData(data.filter(task => !task.completed))
    setHasCompleted(data.filter(task => task.completed) !== []);
  }

  return (
    <>
      <Container className="App">
        <HeaderContainer>
          <Title>Tasks</Title>
          <ViewSelector onSelectView={setView} sx={{width: "100px"}}/>
        </HeaderContainer>
        
        <NewTask onAddTask={handleAddTask}/>
        <TaskList 
          data={data} 
          onDeleteTask={handleDeleteTask}
          onTaskFieldChanged={handleTaskFieldChanged}
          view={view}
        />
        <DeleteAllCompletedButton disabled={view === 2 || !hasCompleted} onDeleteAllCompletedTasks={handleDeleteAllCompletedTasks}/>
      </Container>
    </>
    
  );
}

export default App;


// https://codesandbox.io/s/ltl94?file=/demo.js

/*
<div 
  role="listbox" 
  aria-expanded="false" 
  class="ui dropdown" 
  tabindex="0"
>
  <div 
    aria-atomic="true" 
    aria-live="polite" 
    role="alert" 
    class="divider text"
  >
    File
  </div>
  <i aria-hidden="true" class="dropdown icon"></i>
  <div class="menu transition">
  <div role="option" class="item"
  ><span class="text">New</span></div><div role="option" class="item"><span class="description">ctrl + o</span><span class="text">Open...</span></div><div role="option" class="item"><span class="description">ctrl + s</span><span class="text">Save as...</span></div><div role="option" class="item"><span class="description">ctrl + r</span><span class="text">Rename</span></div><div role="option" class="item"><span class="text">Make a copy</span></div><div role="option" class="item"><i aria-hidden="true" class="folder icon"></i><span class="text">Move to folder</span></div><div role="option" class="item"><i aria-hidden="true" class="trash icon"></i><span class="text">Move to trash</span></div><div class="divider"></div><div role="option" class="item"><span class="text">Download As...</span></div><div role="option" class="item"><span class="text">Publish To Web</span></div><div role="option" class="item"><span class="text">E-mail Collaborators</span></div></div></div>



*/