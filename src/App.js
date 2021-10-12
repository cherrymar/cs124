import './App.css';
import { useState } from 'react';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

import TaskList from './components/TaskList';
import NewTask from './components/NewTask';


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

  return (
    <div className="App">
      {/* <TextField placeholder="New task" variant="standard" fullWidth margin="dense" size="medium" /> */}
      <NewTask onAddTask={handleAddTask}/>
      <TaskList 
        data={data} 
        onDeleteTask={handleDeleteTask}
        onTaskFieldChanged={handleTaskFieldChanged}
      />
    </div>
  );
}

export default App;