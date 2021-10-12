import { useState } from 'react';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
import styled from 'styled-components';

import Button from '@mui/material/Button';


import TaskList from './components/TaskList';
import NewTask from './components/NewTask';
import DeleteAllCompletedButton from './components/DeleteAllCompletedButton';

import './App.css';

const Title = styled.div`
  font-size: 10vw;
  font-weight: 700;
  text-align: left;
`;

const Contianer = styled.div`
  margin: 5vw;
`


function App(props) {
  
  const [data, setData] = useState(props.initialData);

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
      <Contianer className="App">
        <Title>Tasks</Title>
        {/* <TextField placeholder="New task" variant="standard" fullWidth margin="dense" size="medium" /> */}
        <NewTask onAddTask={handleAddTask}/>
        <TaskList 
          data={data} 
          onDeleteTask={handleDeleteTask}
          onTaskFieldChanged={handleTaskFieldChanged}
        />

        <DeleteAllCompletedButton onDeleteAllCompletedTasks={handleDeleteAllCompletedTasks}/>
        
      </Contianer>
    </>
    
  );
}

export default App;