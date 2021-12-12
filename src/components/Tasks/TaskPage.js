import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { useMediaQuery } from 'react-responsive';


import * as actions from '../../backend/store/actions'
// Local imports
import '../../App.css';
import '../../stylesheets/tasks.css';

import SelectSortView from './SelectSortView';
import TabList from './Tabs/TabList';
import TaskListPage from './List/TaskListPage';
import TaskItemPage from './Item/TaskItemPage';
import AddTaskItem from './Item/AddTaskItem';
import Button from '../Misc/Button';

import LogOut from '../LogOut/LogOut';


const CustomButton = styled(Button)`
    margin: 5px;
    width: 100%;
`;

const ListContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    // align-content: stretch;
`;

const TaskPage = ({ listId, listName }) => {
    console.log(listName);
    const isMobile = useMediaQuery({maxWidth: 600})

    return (
        <div className="task-page-container">
            <LogOut />
            <div className="list-container">
                <TaskListPage />
            </div>
            
            <div className="item-list-container">
                
                
                {
                    listId && 
                    <>
                        <div className="item-list-header">
                            <div className="item-list-title" aria-label={listName}>{listName}</div>
                            <SelectSortView />
                        </div>

                        <div className="items-list-body">
                            <TabList aria-label="Filter view options tab">
                                <div key="All">
                                    <TaskItemPage aria-label="View all tasks" />
                                </div>

                                <div key="Done">
                                    <TaskItemPage aria-label="View done tasks" />
                                </div>

                                <div key="In Progress">
                                    <TaskItemPage aria-label="View in progress tasks" />
                                </div>
                            </TabList>
                        </div>
                    </>
                }
            </div>
        </div>
    );
}


const mapStateToProps = ({ firebase, app }) => ({
    userId: firebase.auth.uid,
    tasksLists: app.tasksLists,
    friends: app.friends,


    listId: app.listId,

    // tasksItems: app.tasksItems,
    listName: app.listName,
    // onListSelected: app.onListSelected,
    
    // shareTaskListLoading: app.shareTaskList.loading,
    // shareTaskListError: app.shareTaskList.error,

    // unshareTaskListLoading: app.unshareTaskList.loading,
    // unshareTaskListError: app.unshareTaskList.error,
})
  
const mapDispatchToProps = {
    // shareTaskList: actions.shareTaskList,
    // unshareTaskList: actions.unshareTaskList,
    // selectList: actions.selectList,

    cleanUp: actions.clean,
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskPage)




