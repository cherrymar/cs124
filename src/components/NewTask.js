import React, {useState} from 'react';
import styled from 'styled-components';

import Button from '@mui/material/Button';

const NewItem = styled.input`
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
`;


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
            <SubmitButtonContainer><Button variant="contained" sx={{width: "25%", fontSize: 10}} onClick={handleSubmit}>Submit</Button></SubmitButtonContainer>

        </Container>
        
    </>
  );
}

export default NewTask;
