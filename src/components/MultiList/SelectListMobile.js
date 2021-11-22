import React, {useState} from 'react';
import styled from 'styled-components';

import IconButton from '@mui/material/IconButton';
// import DeleteIcon from '@mui/icons-material/Delete';
import { devices } from '../Design';


// Local imports
import '../../App.css';
import OurButton from '../OurButton';
import AutoResizeTextArea from '../AutoResizeTextArea';


const AddContainer = styled.div`
    // @media ${devices.mobileS} { 
    //     // font-size: 10vw;
    //     margin: 5px;
    // }

    // @media ${devices.laptop} { 
    //     font-size: 2vw;
    //     margin: 10px;
    // }

    // @media ${devices.desktop} { 
    //     font-size: 3vw;
    //     margin: 10px;
    // }

    width: 100%;
    display: flex;
    align-items: flex-start;
    margin: 5vw 0 8vw 0;
    justify-content: space-evenly;
    z-index: -1;

`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;


// const SubmitButtonContainer = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   align-items: center;
//   // width: 100%;
// `;

// const Container = styled.div`
//   width: 100%;
//   display: flex;
//   align-items: flex-start;
//   margin: 5vw 0 8vw 0;
//   justify-content: space-between;
//   z-index: -1;
// `;


export default function SelectListMobile(props) {
    const [taskListName, setNewTaskList] = useState("");

  
    function handleSubmit() {
        props.onSetListView(taskListName);
        props.onHandleAddTaskList(taskListName);
        setNewTaskList("");
        handleClick(taskListName);

    }
   
    function handleClick(list) {
        props.onSetOnMenuView(false)
        props.onSetListView(list)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit()
        }
    }

    return(
        <>
            <Container>
                <AddContainer>
                    <AutoResizeTextArea 
                    completed={"false"} 
                    placeholder="New task list" 
                    value={taskListName} 
                    onChange={event => setNewTaskList(event.target.value)} 
                    onKeyDown={(handleKeyDown)}
                    /> 
                    
                    {/* <SubmitButtonContainer> */}
                    
                    <OurButton 
                        className="submitButton" 
                        disabled={taskListName===""} 
                        variant="contained" 
                        onClick={() => handleSubmit()}
                    >
                        Add
                    </OurButton>
                </AddContainer>
                    {
                        props.tasksLists.map((value, index) => 
                            <OurButton
                                onClick={() => handleClick(value)}
                                key={value}
                                // {...a} 
                            >{value}</OurButton>)
                    }

                    {/* </SubmitButtonContainer> */}
            
                
            
                {/* <IconButton aria-label="Delete task" size="small" onClick={() => props.onDeleteTask(props.id)} sx={{padding: 0}}>
                    <AssignmentIcon fontSize="small" sx={{color: "lightgray"}}/>
                </IconButton>  */}
            </Container>

        </>

    )
}


/*
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
*/