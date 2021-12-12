import React, {useState, useEffect} from 'react';
// import styled from 'styled-components';
import { connect } from 'react-redux'

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


import * as actions from '../../../backend/store/actions';


const DeleteTaskList = ({ deleteTaskList, selectList, loading, error, cleanUp, currentListId, listId, name, sortView, filterView }) => {
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
        
  
    function handleDelete() {
        if (currentListId === listId) {
            selectList({listId: null, listName: null, onListSelected: false, sortView: sortView, filterView: filterView})
        }
        deleteTaskList({listId: listId, sortView: sortView, filterView: filterView})
    }

    return (
        <>
            <IconButton aria-label={"Delete " + name + " list"} size="small" onClick={() => handleDelete()} sx={{padding: 0}}>
                <DeleteIcon fontSize="small" sx={{color: "lightgray"}}/>
            </IconButton>   
        </>
    );
}

const mapStateToProps = ({ app }) => ({
    loading: app.deleteTaskList.loading,
    error: app.deleteTaskList.error,
    currentListId: app.listId,

    sortView: app.sortView,
    filterView: app.filterView,
})

const mapDispatchToProps = {
    deleteTaskList: actions.deleteTaskList,
    selectList: actions.selectList,
    cleanUp: actions.clean,
}
  
export default connect(mapStateToProps, mapDispatchToProps)(DeleteTaskList)