import React, {useState, useEffect} from 'react';
// import styled from 'styled-components';
import { connect } from 'react-redux'
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

import * as actions from '../../../backend/store/actions';
import Button from '../../Misc/Button';
import AutoResizeTextArea from '../../Misc/AutoResizeTextArea';



const AddTaskList = ({ selectList, addTaskList, loading, error, cleanUp, sortView, filterView }) => {
    const [listName, setStateListName] = useState("");
    let displayError
  
    if (error) {
        displayError = {display: "block"}
        console.log(error);
    } else {
        displayError = {display: "none"}
    }
    
    useEffect(() => {
        return () => {
            cleanUp()
        }
    }, [cleanUp])
        
  
    function handleSubmit() {
        let id = generateUniqueID();
        selectList({listId: id, name: listName, onListSelected: true, sortView: sortView, filterView: filterView})
        addTaskList({name: listName, listId: id, sortView: sortView, filterView: filterView})
        setStateListName("");
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    }

    return (
        <div className="new-task-list-container">
            <AutoResizeTextArea 
                aria-label="New task list name"
                completed={"false"} 
                placeholder="New task list" 
                value={listName} 
                onChange={event => setStateListName(event.target.value)} 
                onKeyDown={handleKeyDown}
            /> 
            
            <Button 
                aria-label="Add new task list"
                className="submitButton" 
                disabled={listName===""} 
                variant="contained" 
                onClick={() => handleSubmit()}
            >
                Add
            </Button>
        </div>
    );
}

const mapStateToProps = ({ app }) => ({
    loading: app.addTaskList.loading,
    error: app.addTaskList.error,

    sortView: app.sortView,
    filterView: app.filterView,
})

const mapDispatchToProps = {
    addTaskList: actions.addTaskList,
    selectList: actions.selectList,

    cleanUp: actions.clean,
}
  
export default connect(mapStateToProps, mapDispatchToProps)(AddTaskList)