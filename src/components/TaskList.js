import React, {useState} from 'react';
import TaskItem from './TaskItem';

function TaskList(props) {
  const [selectedId, setSelectedId] = useState(null);
  let displayData = props.data
  
  if (props.view === 1) 
    displayData = displayData.filter(a => a.completed)
  else if (props.view === 2)
    displayData = displayData.filter(a => !a.completed)


  return (
    <>
      {displayData.map(a => 
      <TaskItem
        onRowClick={(id) =>
            setSelectedId(id)}
            handleTaskFieldChanged={props.handleTaskFieldChanged}
        onDeleteTask={props.onDeleteTask}
        selected={a.id === selectedId}
        key={a.id}
        {...a} 
      />)}
    </>
  );
}

export default TaskList;
