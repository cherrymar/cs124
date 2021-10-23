import React, {useState} from 'react';
import styled from 'styled-components';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from "react-dropdown-select";
import { createMuiTheme } from '@material-ui/core/styles'


import '../App.css'

const NewItem = styled.textarea`
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

const SubmitButtonContainer = styled.div`
    width: 5%;
    // margin: 50px 50px 50px 0;
    // margin: 5wh 5wh 5wh 0;
    // align-self: flex-end;
`;

const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    margin: 5vw 0;
`;


const SubmitButton = styled(Button)`
    width: 25%;
    font-size: 10;
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

  


  const theme = createMuiTheme({
    palette: {
      action: {
        disabledBackground: '#0d47a1',
        disabled: 'white',
      }
    }
  })

  
function NewTask(props) {
    const [taskDescription, setTaskDescription] = useState("");
    
    function handleSubmit() {
        props.onAddTask(taskDescription)
        setTaskDescription("")
    }

    return (
    <>
        <Container>
            <NewItem placeholder="New task" value={taskDescription} onChange={event => setTaskDescription(event.target.value)}/> 
            <SubmitButtonContainer>
                {/* <ThemeProvider theme={theme}>
                <   Button disabled={taskDescription===""} variant="contained" sx={{width: "25%", fontSize: 10}} onClick={handleSubmit}>Submit</Button>
                </ThemeProvider> */}
                <SubmitButton className="submitButton" disabled={taskDescription===""} variant="contained" theme={theme} sx={{width: "25%", fontSize: 10, disabledBackground: "white"}} onClick={handleSubmit}>Add</SubmitButton>
            </SubmitButtonContainer>

        </Container>
        
    </>
  );
}

export default NewTask;
