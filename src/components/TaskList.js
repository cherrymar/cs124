import React, {useState} from 'react';
import TaskItem from './TaskItem';
import styled from 'styled-components';


const Container = styled.div`
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  height: 100%;
`;

function TaskList(props) {
  const [selectedId, setSelectedId] = useState(null);
  let displayData = props.data
  
  if (props.view === 1) 
    displayData = displayData.filter(a => a.completed)
  else if (props.view === 2)
    displayData = displayData.filter(a => !a.completed)


  return (
    <Container>
      {displayData.map(a => 
      <TaskItem
        onRowClick={(id) =>
            setSelectedId(id)}
            onTaskFieldChanged={props.onTaskFieldChanged}
        onDeleteTask={props.onDeleteTask}
        selected={a.id === selectedId}
        key={a.id}
        {...a} 
      />)}
    </Container>
  );
}

export default TaskList;
