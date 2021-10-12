import React from 'react';
import styled from 'styled-components';

import DeleteIcon from '@mui/icons-material/Delete';


const Item = styled.input`
    outline: none;
    width: 90%;
    font-size: 4vw;
    border: 2px solid transparent;
    padding: 0 0 0 40px;
    &:focus {
        border: 2px solid cornflowerblue;
    }
`;

const TrashIcon = styled(DeleteIcon)`
    height: 6vw;
    // border: 2px solid transparent;
`;

const Container = styled.div`
    padding: 0 10px;
    display: flex;
    width: 100%;
    border-bottom: 2px solid transparent;
    box-shadow: 0 3px lightgray;
`;

const CheckBox = styled.input`
`;

function TaskItem(props) {
  return (
    <>
        <Container>
            <CheckBox 
                type="checkbox" 
                defaultValue={props.completed} 
                onChange={event => props.onTaskFieldChanged(props.id, "completed", event.target.checked)}/> 
            <Item 
                id={props.id} 
                placeholder={props.description} 
                defaultValue={props.description} 
                onChange={event => props.onTaskFieldChanged(props.id, "description", event.target.value)}
                /> 
            <TrashIcon 
                color="disabled"
            />
        </Container>
        
    </>
  );
}

export default TaskItem;
