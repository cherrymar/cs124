import React from 'react';
import styled from 'styled-components';

import 'bootstrap/dist/css/bootstrap.css';
import './Dropdown.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


export default function CustomDropdown(props) {
  // const [open, setOpen] = React.useState(false);
  // const anchorRef = React.useRef(null);
  const [sortView, setSortView] = React.useState("dateCreated");

  const handleMenuItemClick = (event, view, onSelectView) => {
    setSortView(view);
    // setOpen(false);
    onSelectView(view);
  };

  // const handleToggle = () => {
  //   setOpen((prevOpen) => !prevOpen);
  // };

  // const handleClose = (event) => {
  //   if (anchorRef.current && anchorRef.current.contains(event.target)) {
  //     return;
  //   }

  //   setOpen(false);
  // };


  return (
    <DropdownButton id="dropdown-basic-button" title={props.sortByOptions[sortView]}>
      {
        Object.keys(props.sortByOptions).map((option) => (
          <Dropdown.Item 
            className="drop-down-item"
            // styles={{width: "120px"}}
            onClick={(event) => handleMenuItemClick(event, option, props.onSelectView)}
          >
            {props.sortByOptions[option]}
          </Dropdown.Item>
        ))

      }
    </DropdownButton>

  );
}

// Object.keys(props.filterView).map(view => 
//           <Dropdown.Item>
//             {view}
//           </Dropdown.Item>
//         )