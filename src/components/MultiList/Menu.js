import React, {useState} from 'react';
import styled from 'styled-components';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import IconButton from '@mui/material/IconButton';

import ListAltIcon from '@mui/icons-material/ListAlt';
import AssignmentIcon from '@mui/icons-material/Assignment';


// import CustomDropdown from './components/CustomDropdown';
import '../../css/Dropdown.css';
import MenuItem from './MenuItem';

// import DeleteIcon from '@mui/icons-material/Delete';


const Container = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 5px;
    display: flex;
    justify-content: space-around;
    background: gray;
    margin: auto;
    width: 100vw;
`;

function Menu(props) {
    function handleMenuItemClick() {

    }

    return (
      <>
        <Container>
            <MenuItem onClick={props.onSelectListView(true)}>
                <ListAltIcon fontSize="small" sx={{color: "lightgray"}}/>
            </MenuItem>
            <MenuItem onClick={props.onSelectListView(false)} >
                <AssignmentIcon fontSize="small" sx={{color: "lightgray"}}/>
            </MenuItem>
        </Container>
        

        {/* <DropdownButton  title={<MoreHorizIcon fontSize="small" sx={{color: "lightgray"}}/>}> */}
        {/* <IconButton class="dropdown-menu" aria-label="Delete task" size="small" data-toggle="dropdown">
            <MoreHorizIcon  fontSize="small" sx={{color: "lightgray"}}> */}
                {/* {
                    Object.keys(props.sortByOptions).map((option) => (
                    <Dropdown.Item
                        aria-label={props.sortByOptions[option]}
                        key={"drop-down-item-" + option}
                        className="drop-down-item"
                        // onClick={(event) => handleMenuItemClick(event, option, props.onSelectView)}
                    >
                        {props.sortByOptions[option]}
                    </Dropdown.Item>
                    ))
                } */}
            {/* </MoreHorizIcon>
        </IconButton>  */}
        {/* </DropdownButton> */}

        
          {/* <Container>
              <IconButton aria-label="Delete task" size="small" onClick={() => props.onDeleteTask(props.id)} sx={{padding: 0}}>
                  <MoreHorizIcon fontSize="small" sx={{color: "lightgray"}}/>
              </IconButton> 
          </Container> */}
          
      </>
    );
  }
  
  export default Menu;
  
  
  

  /*
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


import '../css/Dropdown.css';


export default function CustomDropdown(props) {
  const [sortView, setSortView] = React.useState("dateCreated");

  const handleMenuItemClick = (event, view, onSelectView) => {
    setSortView(view);
    onSelectView(view);
  };

  return (
    <DropdownButton id="dropdown-basic-button" title={props.sortByOptions[sortView]}>
      {
        Object.keys(props.sortByOptions).map((option) => (
          <Dropdown.Item
            aria-label={props.sortByOptions[option]}
            key={"drop-down-item-" + option}
            className="drop-down-item"
            onClick={(event) => handleMenuItemClick(event, option, props.onSelectView)}
          >
            {props.sortByOptions[option]}
          </Dropdown.Item>
        ))
      }
    </DropdownButton>

  );
}
  */