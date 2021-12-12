import React, {useState, useEffect} from 'react';
// import styled from 'styled-components';

import { connect } from 'react-redux';

import * as actions from '../../../backend/store/actions';

import Button from '../../Misc/Button';
import AutoResizeTextArea from '../../Misc/AutoResizeTextArea';
import StarsRating from '../../Misc/StarsRating';


const AddTaskItem = ({ addTaskItem, loading, error, cleanUp, listId, sortView, filterView }) => {
    const [taskDescription, setTaskDescription] = useState("");
    const [taskPriority, setTaskPriority] = useState(0);

    let displayError
  
    if (error) {
        displayError = {display: "block"}
    } else {
        displayError = {display: "none"}
    }
    
    useEffect(() => {
        return () => {
            cleanUp()
        }
    }, [cleanUp])
        
  
    function handleSubmit() {
        addTaskItem({listId: listId, description: taskDescription, priority: taskPriority, sortView: sortView, filterView: filterView});
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
        <div className="new-task-container">
            <AutoResizeTextArea 
                completed={"false"} 
                placeholder="New task" 
                value={taskDescription} 
                onChange={event => setTaskDescription(event.target.value)} 
                onKeyDown={(handleKeyDown)}
            /> 
            
            <div className="new-task-button-container">
                <StarsRating
                    name="customized-color"
                    defaultValue={0}
                    value={taskPriority}
                    onChange={(event, value) => setTaskPriority(value)}
                    max={3}
                    size="small"
                />
            
                <Button 
                    className="submitButton" 
                    disabled={taskDescription===""} 
                    variant="contained" 
                    onClick={handleSubmit}
                >
                    Add
                </Button>
            </div>
        </div>
    </>
  );
}

const mapStateToProps = ({ app }) => ({
    loading: app.addTaskItem.loading,
    error: app.addTaskItem.error,
    listId: app.listId,

    sortView: app.sortView,
    filterView: app.filterView,
})

const mapDispatchToProps = {
    addTaskItem: actions.addTaskItem,
    cleanUp: actions.clean,
}
  
export default connect(mapStateToProps, mapDispatchToProps)(AddTaskItem)