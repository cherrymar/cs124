import React, {useState} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux'

import * as actions from '../../../backend/store/actions';
import TaskItem from './TaskItem';


/**
 * 
 * 
const Container = styled.div`
    height: 55vh;
`
 */
const Container = styled.div`
    overflow: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
    height: 100%;
`;

const TaskItemList = ({tasksItems}) => {
    const [selectedId, setSelectedId] = useState(null);

    return (
            // <div className="item-list-container">
            <Container>
                { tasksItems &&
                    tasksItems.map((task, index) =>
                        <TaskItem
                            onRowClick={(id) => setSelectedId(id)}
                            selected={task.id === selectedId}
                            key={task.id}
                            taskId={task.id}
                            completed={task.completed}
                            description={task.description}
                            priority={task.priority}
                        />
                    )
                }
            </Container>
            // </div>
    );
}



const mapStateToProps = ({ firebase, app }) => ({
    // userId: firebase.auth.uid,
    // tasksLists: app.tasksLists,
    // friends: app.friends,

    listId: app.listId,
    tasksItems: app.tasksItems,
})
  
const mapDispatchToProps = {
    // shareTaskList: actions.shareTaskList,
    // unshareTaskList: actions.unshareTaskList,
    // selectList: actions.selectList,

    // cleanUp: actions.clean,
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItemList)




