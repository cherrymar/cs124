import React, { useState } from 'react';

// Local imports
import DeleteTaskItem from './DeleteTaskItem';
import EditTaskItem from './EditTaskItem';


export default function TaskItem(props) {
    // console.log("inside task item");
    // console.log("inside task item", props.taskId);

    return (
    <>
        <div className="task-item-container">
            <EditTaskItem 
                taskId={props.taskId} 
                completed={props.completed}
                description={props.description}
                priority={props.priority}
            /> 
            <DeleteTaskItem 
                taskId={props.taskId} 
            />
        </div>
        
    </>
  );
}
