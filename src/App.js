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
`

const Selector = styled.select`
  font-size: 20px;
  background-color: darkgray;
  color: white;
`;

function App(props) {
  
  const [data, setData] = useState(props.initialData);
  const [view, setView] = useState(0);

  function handleDeleteTask(taskId) {
      setData(data.filter(task => task.id !==taskId))
  }

  function handleAddTask(description) {
      setData([...data, {
          id: generateUniqueID(),
          description: description,
          completed: false
      }])
  }

  function handleTaskFieldChanged(taskId, field, value) {
      setData(data.map(
          task => task.id !== taskId
              ? task
              : {...task, [field]: value}))
  }

  function handleDeleteAllCompletedTasks() {
    setData(data.filter(task => !task.completed))
  }

  return (
    <>
      <Container className="App">
        <Title>Tasks</Title>
        {/* <TextField placeholder="New task" variant="standard" fullWidth margin="dense" size="medium" /> */}
        <NewTask onAddTask={handleAddTask}/>
        <TaskList 
          data={data} 
          onDeleteTask={handleDeleteTask}
          onTaskFieldChanged={handleTaskFieldChanged}
          view={view}
        />

        <DeleteAllCompletedButton onDeleteAllCompletedTasks={handleDeleteAllCompletedTasks}/>
        {/* <Selector onChange={(values) => setView(values)} color="black">
          <option value="all">all</option>
            <option value="completed">completed</option>
            <option value="not completed">not completed</option>
          
          </Selector> */}
        <ViewSelector onSelectView={setView} />
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