import React, {useState} from 'react';
import styled from 'styled-components';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";


import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


// Local imports
import '../../App.css';
import OurButton from '../OurButton';
import AutoResizeTextArea from '../AutoResizeTextArea';
import { devices } from '../Design';


const AddContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    margin: 5vw 0 8vw 0;
    justify-content: space-between;
    // z-index: -1;
    padding: 12px 5px;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px;
    // align-items: flex-start;
    // justify-content: flex-start;
    // flex-wrap: wrap;
`;

const CustomButton = styled(OurButton)`
  margin: 5px;
  width: 100%;
`;

const ListContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  // align-content: stretch;
`;


export default function SelectListMobile(props) {
  const [taskListName, setNewTaskList] = useState("");

  
  
  function handleSubmit() {
    let id = generateUniqueID();
    props.onHandleAddTaskList(taskListName, id);
    props.onSetListName(taskListName);
    setNewTaskList("");
    props.onSetOnMenuView(false);
    props.onSetListId(id);
  }
 
  function handleClick(listId, name) {
    props.onSetOnMenuView(false);
    props.onSetListName(name);
    props.onSetListId(listId);
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
                    aria-label="New task list name"
                    completed={"false"} 
                    placeholder="New task list" 
                    value={taskListName} 
                    onChange={event => setNewTaskList(event.target.value)} 
                    onKeyDown={(handleKeyDown)}
                  /> 
                  
                  
                  <OurButton 
                    aria-label="Add new task list"
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
                    <ListContainer>
                      <CustomButton
                        aria-label={value.name + " task list"}
                        onClick={() => handleClick(value.id, value.name)}
                        key={value.id}
                      >
                        {value.name}
                      </CustomButton>

                      <IconButton aria-label={"Delete " + value.name + " list"} size="small" onClick={() => props.onHandleDeleteTaskList(value.id)} sx={{padding: 0}}>
                        <DeleteIcon fontSize="small" sx={{color: "lightgray"}}/>
                      </IconButton>   
                    </ListContainer>
                    
                    )
                }
          </Container>

      </>

  )
}