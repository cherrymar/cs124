import React from 'react';
import styled from 'styled-components';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Rating from '@mui/material/Rating';

// Local imports
import AutoResizeTextArea from './AutoResizeTextArea';

// const Item = styled.textarea`
//     outline: none;
//     width: 50%;
//     font-size: 4vw;
//     border: none;
//     border-bottom: 2px solid black;
//     padding: 0;
//     // margin: 50px 50px 50px 0;
//     margin: 2vw 2vw 2vw 0;
//     background-color: black;
//     color: ${prop => prop.completed ? '#555555' : 'lightgray'};
//     &:focus {
//         border-bottom: 2px solid gray;
//     }
//     overflow-wrap: break-word;
//     font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
//     'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
//     sans-serif;
// `;

const Container = styled.div`
    padding: 5px 10px;
    display: flex;
    // flex-direction: row;
    // flex-wrap: wrap;
    // width: 100%;
    // border-bottom: 1px solid transparent;
    // box-shadow: 0 3px lightgray;
    justify-content: space-between;
    align-items: flex-start;

`;

const CheckBox = styled.input`
    width: 4vw;
    height: 4vw;
    // margin: 50px 50px 50px 0;
    margin: 0 2vw 2vw 0;
`;

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      // color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
      // color: '#ff3d47',
    },
    '& .Mui-focusVisible': {
      opacity: 1,
      borderColor: "#fff",
    }
  });

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
              <StyledRating
                name="customized-color"
                defaultValue={props.priority}
                onChange={(event, value) => props.onTaskFieldChanged(props.id, "priority", value)}
                // emptyIcon={<StarIcon style={{ opacity: .99}}/>}
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


