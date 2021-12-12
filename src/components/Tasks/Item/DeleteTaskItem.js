import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../backend/store/actions';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteTaskItem = ({ deleteTaskItem, loading, error, cleanUp, listId, taskId, sortView, filterView }) => {
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
            <IconButton 
                aria-label="Delete task" 
                size="small" 
                onClick={() => deleteTaskItem({listId: listId, taskId: taskId, sortView: sortView, filterView: filterView})} sx={{padding: 0}}
            >
                <DeleteIcon fontSize="small" sx={{color: "lightgray"}}/>
            </IconButton>
        </>
    );
}


const mapStateToProps = ({ auth, app }) => ({
    loading: app.deleteTaskItem.loading,
    error: app.deleteTaskItem.error,
    listId: app.listId,

    sortView: app.sortView, 
    filterView: app.filterView,
})
  
const mapDispatchToProps = {
    deleteTaskItem: actions.deleteTaskItem,
    cleanUp: actions.clean,
}
  
export default connect(mapStateToProps, mapDispatchToProps)(DeleteTaskItem)
