import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import * as actions from '../../../backend/store/actions';

// Local imports
import AutoResizeTextArea from '../../Misc/AutoResizeTextArea';
import StarsRating from '../../Misc/StarsRating';

const EditTaskItem = ({ editTaskItem, loading, error, cleanUp, listId, taskId, completed, description, priority, sortView, filterView }) => {
    // const [taskDescription, setTaskDescription] = useState("");
    // const [taskPriority, setTaskPriority] = useState(0);

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

    
    return (
    <>
        <input
            className="task-item-checkbox" 
            aria-label={ "Mark task"}
            type="checkbox" 
            checked={completed===true} 
            onChange={event => editTaskItem({
                listId: listId, 
                taskId: taskId, 
                field: "completed", 
                value: event.target.checked, 
                sortView: sortView, 
                filterView: filterView})}
        /> 
        <AutoResizeTextArea
            completed={completed.toString()}
            id={taskId} 
            placeholder={description} 
            defaultValue={description} 
            onChange={event => editTaskItem({
                listId: listId, 
                taskId: taskId, 
                field: "description", 
                value: event.target.value, 
                sortView: sortView, 
                filterView: filterView})}
        />
        <StarsRating
            value={priority}
            onChange={(event, value) => editTaskItem({
                listId: listId, 
                taskId: taskId, 
                field: "priority", 
                value: value, 
                sortView: sortView, 
                filterView: filterView})}
            max={3}
            size="small"
        />
    </>
  );
}

const mapStateToProps = ({ auth, app }) => ({
    error: app.editTaskItem.loading,
    loading: app.editTaskItem.error,
    listId: app.listId,

    sortView: app.sortView, 
    filterView: app.filterView,
})
  
const mapDispatchToProps = {
    editTaskItem: actions.editTaskItem,
    cleanUp: actions.clean,
}
  
  export default connect(mapStateToProps, mapDispatchToProps)(EditTaskItem)
