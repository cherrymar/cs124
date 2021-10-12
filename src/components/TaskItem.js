import React from 'react';
import styled from 'styled-components';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const Item = styled.input`
    outline: none;
    width: 80%;
    font-size: 4vw;
    border: 2px solid transparent;
    // padding: 0 0 0 40px;
    background-color: black;
    color: lightgray;
    &:focus {
        border-bottom: 2px solid lightgray;
    }
`;

const Container = styled.div`
    padding: 0 10px;
    display: flex;
    width: 100%;
    // border-bottom: 1px solid transparent;
    // box-shadow: 0 3px lightgray;
`;

const CheckBox = styled.input`
    width: 2vw;
    height: 2vw;
    // margin: 50px 50px 50px 0;
    margin: 5wh 5wh 5wh 0;
`;

function TaskItem(props) {
  return (
    <>
        <Container>
            <CheckBox 
                type="checkbox" 
                checked={props.completed===true} 
                onChange={event => props.onTaskFieldChanged(props.id, "completed", event.target.checked)}/> 
            <Item 
                id={props.id} 
                placeholder={props.description} 
                defaultValue={props.description} 
                onChange={event => props.onTaskFieldChanged(props.id, "description", event.target.value)}
                /> 
            <IconButton aria-label="delete" size="small" onClick={() => props.onDeleteTask(props.id)}>
                <DeleteIcon fontSize="small" color="gray"/>
            </IconButton> 
        </Container>
        
    </>
  );
}

export default TaskItem;


