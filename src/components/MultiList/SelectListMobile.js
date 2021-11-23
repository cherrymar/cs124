import React, {useState} from 'react';
import styled from 'styled-components';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";


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
    justify-content: space-between;
    // z-index: -1;
    padding: 5px 12px;

`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;
`;

const CustomButton = styled(OurButton)`
  margin: 5px;
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
      let id = generateUniqueID();
      props.onHandleAddTaskList(taskListName, id);
      props.onSetListName(taskListName)
      setNewTaskList("");
      handleClick(id);

    }
   
    function handleClick(listId, name) {
      props.onSetListName(name)
      props.onSetOnMenuView(false)
      props.onSetListId(listId)
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
                        <CustomButton
                            onClick={() => handleClick(value.id, value.name)}
                            key={value.id}
                        >
                          {value.name}
                        </CustomButton>)
                }
        </Container>

    </>

  )
}