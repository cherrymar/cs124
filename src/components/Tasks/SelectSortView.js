import React, {useState} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux'


// https://react-bootstrap.github.io/components/dropdowns/
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import * as actions from '../../backend/store/actions';

// import '../css/Dropdown.css';
// import { devices } from './Design';


// const Container = styled.div`
//     display: flex;
//     justify-content: flex-end:
// `;

// const Text = styled.div`
//     // margin: auto;
//     @media ${devices.mobileS} { 
//         margin: auto 5px;
// }

// @media ${devices.laptop} { 
//     margin: auto 10px;
// }

// @media ${devices.desktop} { 
//     margin: auto 10px;
// }
// `;



// Options for sorting the task list
const sortByOptions = {
    "dateCreated" : "Date Created", 
    "priority" : "Priority", 
    "description" : "Description",
  }

const SelectSortView = ({ initialSortView, filterView, listId, setSortByView }) => {
    console.log("initial sort view", initialSortView);
    const [sortView, setSortView] = useState(initialSortView);

    const handleMenuItemClick = (event, view) => {
        console.log("new sort view", view)
        setSortView(view);
        setSortByView({listId: listId, sortView: view, filterView: filterView});
    };

    return (
        <div className="dropdown-container">
            <div className="sort-by-text">Sort By: </div>
            <DropdownButton id="dropdown-basic-button" title={sortByOptions[sortView]}>
                {
                    Object.keys(sortByOptions).map((option) => (
                        <Dropdown.Item
                            aria-label={sortByOptions[option]}
                            key={"drop-down-item-" + option}
                            className="drop-down-item"
                            onClick={(event) => handleMenuItemClick(event, option)}
                            >
                            {sortByOptions[option]}
                            </Dropdown.Item>
                        ))
                }
            </DropdownButton>
        </div>
    );
}

const mapStateToProps = ({ firebase, app }) => ({
    initialSortView: app.sortView,
    listId: app.listId,
    filterView: app.filterView,
})

const mapDispatchToProps = {
    setSortByView: actions.setSortByView,
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectSortView)




