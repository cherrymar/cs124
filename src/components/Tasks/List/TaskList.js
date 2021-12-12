import React, {useState} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux'

// Local imports
import Button from '../../Misc/Button';
import DeleteTaskList from './DeleteTaskList';

import * as actions from '../../../backend/store/actions'


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


const TaskList = ({selectList, tasksLists, sortView, filterView}) => {
        return(
        <>
            { tasksLists &&
                tasksLists.map((value, index) => 
                    <ListContainer>
                        <CustomButton
                            aria-label={value.name + " task list"}
                            onClick={() => selectList({listId: value.id, listName: value.name, onListSelected: true, sortView: sortView, filterView: filterView})}
                            key={value.id}
                        >
                            {value.name}
                        </CustomButton>
                        <DeleteTaskList key={"delete"+value.id} listId={value.id} name={value.name}/>
                    </ListContainer>
                )
            }
        </>
    );
}


const mapStateToProps = ({ app }) => ({
    tasksLists: app.tasksLists,
    sortView: app.sortView,
    filterView: app.filterView,
})
  
const mapDispatchToProps = {
    selectList: actions.selectList,
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)
