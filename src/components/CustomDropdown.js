import React from 'react';
import styled from 'styled-components';

import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


import '../css/Dropdown.css';
import { devices } from './Design';


const Container = styled.div`
  display: flex;
  justify-content: flex-end:
`;

const Text = styled.div`
  // margin: auto;
  @media ${devices.mobileS} { 
    margin: auto 5px;
  }

  @media ${devices.laptop} { 
    margin: auto 10px;
  }

  @media ${devices.desktop} { 
    margin: auto 10px;
  }
`;


export default function CustomDropdown(props) {
  const [sortView, setSortView] = React.useState("dateCreated");

  const handleMenuItemClick = (event, view, onSelectView) => {
    setSortView(view);
    onSelectView(view);
  };

  return (
    <Container>
    <Text>Sort by</Text>
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
    </Container>

  );
}