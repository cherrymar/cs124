import React from 'react';
import styled from 'styled-components';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const Item = styled.textarea`
    outline: none;
    width: 80%;
    font-size: 4vw;
    border: none;
    border-bottom: 2px solid black;
    padding: 0;
    // margin: 50px 50px 50px 0;
    margin: 2vw 2vw 2vw 0;
    background-color: black;
    color: lightgray;
    &:focus {
        border-bottom: 2px solid cornflowerblue;
    }
    overflow-wrap: break-word;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
`;

const Container = styled.div`
    padding: 0 10px;
    display: flex;
    width: 100%;
    // border-bottom: 1px solid transparent;
    // box-shadow: 0 3px lightgray;
`;

const CheckBox = styled.input`
    width: 4vw;
    height: 4vw;
    // margin: 50px 50px 50px 0;
    margin: 2vw 2vw 2vw 0;
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
                <DeleteIcon fontSize="small" sx={{color: "lightgray"}}/>
            </IconButton> 
        </Container>
        
    </>
  );
}

export default TaskItem;


