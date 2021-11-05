import React from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import './Dropdown.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


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