import React, {useState} from 'react';
import styled from 'styled-components';

import IconButton from '@mui/material/IconButton';
// import DeleteIcon from '@mui/icons-material/Delete';

import AssignmentIcon from '@mui/icons-material/Assignment';


export default function SelectList(props) {



    return(
        <>
            {
            props.tasksLists.map((value, index) => 
                <div
                    onClick={() =>
                        props.onSetListView(value)}
                    key={value}
                    // {...a} 
                >{value}</div>)
            }
           
            {/* <IconButton aria-label="Delete task" size="small" onClick={() => props.onDeleteTask(props.id)} sx={{padding: 0}}>
                <AssignmentIcon fontSize="small" sx={{color: "lightgray"}}/>
            </IconButton>  */}

        </>

    )
}