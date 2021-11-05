import React from 'react';
import styled from 'styled-components';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

// Local imports
import AutoResizeTextArea from './AutoResizeTextArea';
import StarsRating from './StarsRating';


const Container = styled.div`
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

`;

const CheckBox = styled.input`
    width: 4vw;
    height: 4vw;
    margin: 0 2vw 2vw 0;
`;


function TaskItem(props) {
  return (
    <>
        <Container>
            <CheckBox 
                type="checkbox" 
                checked={props.completed===true} 
                onChange={event => props.onTaskFieldChanged(props.id, "completed", event.target.checked)}/> 
            <AutoResizeTextArea
              completed={props.completed}
              id={props.id} 
              placeholder={props.description} 
              defaultValue={props.description} 
              onChange={event => props.onTaskFieldChanged(props.id, "description", event.target.value)}
            />
              <StarsRating
                defaultValue={props.priority}
                onChange={(event, value) => props.onTaskFieldChanged(props.id, "priority", value)}
                max={3}
                size="small"
              />
            <IconButton aria-label="delete" size="small" onClick={() => props.onDeleteTask(props.id)} sx={{padding: 0}}>
                <DeleteIcon fontSize="small" sx={{color: "lightgray"}}/>
            </IconButton> 
        </Container>
        
    </>
  );
}

export default TaskItem;


