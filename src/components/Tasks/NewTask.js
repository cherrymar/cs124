import React, {useState} from 'react';
import styled from 'styled-components';

// Local imports
import '../../App.css';
import OurButton from '../OurButton';
import AutoResizeTextArea from '../AutoResizeTextArea';
import StarsRating from '../StarsRating';

import { devices } from '../Design';

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
  
  justify-content: space-between;
  z-index: -1;

  @media ${devices.mobileS} { 
    margin: 5vw 0 8vw 0;
  }

  @media ${devices.laptop} { 
    margin: 2vw 0 4vw 0;
  }

  @media ${devices.desktop} { 
    margin: 2vw 0 4vw 0;
  }
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
      handleSubmit();
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

