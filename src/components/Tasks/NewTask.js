import React, {useState} from 'react';
import styled from 'styled-components';

// import Rating from '@mui/material/Rating';
// import StarBorderIcon from "@material-ui/icons/StarBorder";
// import { makeStyles } from "@material-ui/core/styles";

// Local imports
import '../../App.css';
import OurButton from '../OurButton';
import AutoResizeTextArea from '../AutoResizeTextArea';
import StarsRating from '../StarsRating';


const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  // width: 100%;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  margin: 5vw 0 8vw 0;
  justify-content: space-between;
  z-index: -1;
`;


function NewTask(props) {
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState(0);

  
  function handleSubmit() {
    props.onAddTask(taskDescription, taskPriority);
    setTaskDescription("");
    setTaskPriority(0);
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      props.onAddTask(taskDescription, taskPriority);
      setTaskDescription("");
      setTaskPriority(0);
    }
  }

  return (
    <>
      <Container>
        <AutoResizeTextArea 
          completed={"false"} 
          placeholder="New task" 
          value={taskDescription} 
          onChange={event => setTaskDescription(event.target.value)} 
          onKeyDown={(handleKeyDown)}
        /> 
        
        <SubmitButtonContainer>
          <StarsRating
            name="customized-color"
            defaultValue={0}
            value={taskPriority}
            onChange={(event, value) => setTaskPriority(value)}
            // onPriorityChange={setTaskPriority}
            max={3}
            size="small"
          />
          
          <OurButton 
            className="submitButton" 
            disabled={taskDescription===""} 
            variant="contained" 
            onClick={handleSubmit}
          >
            Add
          </OurButton>
        </SubmitButtonContainer>
      </Container>
    </>
  );
}

export default NewTask;

