import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import IconButton from '@mui/material/IconButton';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import '../../css/Dropdown.css';


function BackButton(props) {

    return (
      <>
        <>
          <IconButton aria-label={props.label} size="small" onClick={() => props.onSetOnMenuView(true)} sx={{padding: 0}}>
            <ArrowBackIosNewIcon fontSize="small" sx={{color: "lightgray"}}/>
          </IconButton>
        </>
          
      </>
    );
  }
  
  export default BackButton;