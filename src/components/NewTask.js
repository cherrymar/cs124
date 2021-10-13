import React, {useState} from 'react';
import styled from 'styled-components';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

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

    &:disabled {
        opacity: 50%;
    }
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


  const theme = createTheme({
    components: {
      // Name of the component
      MuiButton: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            fontSize: '1rem',
            fontColor: "white"
          },
        },
      },
    },
  });


function NewTask(props) {
    const [taskDescription, setTaskDescription] = useState("");
    
    function handleSubmit() {
        props.onAddTask(taskDescription)
        setTaskDescription("")
    }

    return (
    <>
        <Container>
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '20ch'},
            }}
            noValidate
            autoComplete="off"
        >
            {/* <ThemeProvider theme={theme}> */}
                <TextField
                    id="standard-multiline-flexible"
                    label="New task"
                    multiline
                    onChange={event => setTaskDescription(event.target.value)}
                    variant="standard"
                    sx={{color: "white", opacity: "50%"}}
                />
            {/* </ThemeProvider> */}
            
        </Box>

            
            {/* <NewItem placeholder="New task" value={taskDescription} onChange={event => setTaskDescription(event.target.value)}/>  */}
            <SubmitButtonContainer>
                <Button disabled={taskDescription===""} variant="contained" sx={{width: "25%", fontSize: 10}} onClick={handleSubmit}>Submit</Button>
                {/* <SubmitButton disabled={taskDescription===""} variant="contained">Submit</SubmitButton> */}
            </SubmitButtonContainer>

        </Container>
        
    </>
  );
}

export default NewTask;
