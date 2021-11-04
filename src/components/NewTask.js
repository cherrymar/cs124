import React, {useState} from 'react';
import styled from 'styled-components';

// import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
// import Select from "react-dropdown-select";
import { createMuiTheme } from '@material-ui/core/styles'
import Rating from '@mui/material/Rating';
// import { makeStyles } from '@mui/material';
// import Stack from '@mui/material/Stack';
// import { red } from '@mui/material/colors';

import '../App.css'
// import zIndex from '@mui/material/styles/zIndex';

const NewItem = styled.input`
    outline: none;
    // width: 70%;
    font-size: 4vw;
    border: none;
    border-bottom: 2px solid black;
    padding: 0;
    // margin: 50px 50px 50px 0;
    // margin: 2vw 2vw 2vw 0;
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

const SubmitButtonContainer = styled.div`
    // width: 5%;
    // margin: 50px 50px 50px 0;
    // margin: 5wh 5wh 5wh 0;
    justify-content: flex-end;
    width: 100$;
   
`;

const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin: 5vw 0;
    align-content: flex-start;
    // justify-content: space-between;
`;


const SubmitButton = styled(Button)`
    width: 25%;
    font-size: 10;
    align-self: flex-end;
`;




const TextInput = styled(TextField)({
    '& label.Mui-focused': {
      color: 'green',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red',
      },
      '&:hover fieldset': {
        borderColor: 'yellow',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
    },
  });


  const StyledRating = styled(Rating)({
    '& .MuiRating-root': {
      margin: 0,
      padding: "5px",
    },
    '& .MuiRating-iconFilled': {
      color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
      color: '#ff3d47',
    },
    '& .Mui-focusVisible': {
      opacity: 100,
      borderColor: "#fff",
    }
    
  });
  
  
function NewTask(props) {
    const [taskDescription, setTaskDescription] = useState("");
    const [taskPriority, setTaskPriority] = useState(0);
    
    function handleSubmit() {
        props.onAddTask(taskDescription, taskPriority)
        setTaskDescription("")
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        props.onAddTask(taskDescription, taskPriority)
        setTaskDescription("")
      }
    }


    return (
    <>
        <Container>
            <NewItem placeholder="New task" value={taskDescription} onChange={event => setTaskDescription(event.target.value)} onKeyDown={(handleKeyDown)}/> 

              {/* <Rating name="size-small" defaultValue={2} size="small" /> */}
            <SubmitButtonContainer>
              <StyledRating
                name="customized-color"
                defaultValue={0}
                // getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                onChange={(event, value) => setTaskPriority(value)}
                max={3}
                size="small"
              />
                <SubmitButton className="submitButton" disabled={taskDescription===""} variant="contained"  onClick={handleSubmit}>Add</SubmitButton>
            </SubmitButtonContainer>

        </Container>
        
    </>
  );
}

export default NewTask;
