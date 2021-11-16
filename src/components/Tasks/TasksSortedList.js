// import react from 'react';
import TaskList from './TaskList';
import styled from 'styled-components';

const Container = styled.div`
  height: 55vh;
`

function TasksSortedList(props) {
    return (
    <>
        <Container> 
            <TaskList
                data={props.data} 
                onDeleteTask={props.handleDeleteTask}
                onTaskFieldChanged={props.handleTaskFieldChanged}
            /> 
        </Container>
    </>
    );
}

export default TasksSortedList;



