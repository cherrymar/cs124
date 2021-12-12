import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux'

import * as actions from '../../../backend/store/actions'
// Local imports

import AddTaskItem from './AddTaskItem';
import TaskItemList from './TaskItemList';
import DeleteAllCompletedButton from './DeleteAllCompletedButton';

// const CustomButton = styled(Button)`
//     margin: 5px;
//     width: 100%;
// `;

const ListContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    // align-content: stretch;
`;

export default function TaskItemPage() {
    console.log("made it to task item page");
    return (
        <div className="items-container">
            {/* <AddTaskItem/> */}
            <div className="item-list-container-size">
                <TaskItemList/>
            </div>
            <DeleteAllCompletedButton/>
        </div>
    );
}