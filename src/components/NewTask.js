import React, {useState} from 'react';
import styled from 'styled-components';

import Rating from '@mui/material/Rating';

// Local imports
import '../App.css';
import OurButton from './OurButton';
import AutoResizeTextArea from './AutoResizeTextArea';


const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 40%;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  margin: 5vw 0 8vw 0;

`;

const StyledRating = styled(Rating)({
  margin: "10px",
  '& .MuiRating-root': {
    opacity: 100,
    borderColor: "#fefefe",
  },
  '& .MuiRating-labelEmptyValueActive': {
    opacity: 100,
    borderColor: "#fefefe",
  },
  '& .MuiRating-iconFilled': {
    // color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    
    // color: '#ff3d47',
  },
  '& .Mui-focusVisible': {
    opacity: 100,
    borderColor: "#fefefe",
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
            <AutoResizeTextArea placeholder="New task" value={taskDescription} onChange={event => setTaskDescription(event.target.value)} onKeyDown={(handleKeyDown)}/> 
            <SubmitButtonContainer>
              <StyledRating
                name="customized-color"
                defaultValue={0}
                onChange={(event, value) => setTaskPriority(value)}
                max={3}
                size="small"
              />
                <OurButton className="submitButton" disabled={taskDescription===""} variant="contained"  onClick={handleSubmit}>Add</OurButton>
            </SubmitButtonContainer>

        </Container>
        
    </>
  );
}

export default NewTask;
