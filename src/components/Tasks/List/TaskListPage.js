import React, {useState} from 'react';
import styled from 'styled-components';

// Local imports
import AddTaskList from './AddTaskList';
import TaskList from './TaskList';


export default function TaskListPage() {
    return(
        <div className="task-list-container">
            <AddTaskList />
            <TaskList />
        </div>

    );
}