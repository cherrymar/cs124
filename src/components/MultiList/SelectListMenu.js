import React, {useState} from 'react';
import styled from 'styled-components';

import IconButton from '@mui/material/IconButton';
// import DeleteIcon from '@mui/icons-material/Delete';

import ListAltIcon from '@mui/icons-material/ListAlt';

const Container = styled.div`

`


export default function SelectListMenu(props) {



    return(
        <>
            <IconButton aria-label="Delete task" size="small" onClick={() => props.onDeleteTask(props.id)} sx={{padding: 0}}>
                <ListAltIcon fontSize="small" sx={{color: "lightgray"}}/>
            </IconButton> 

        </>

    )
}