import React, {useState} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

// Local imports
import * as actions from '../../../backend/store/actions';

import DeleteAllAlert from './DeleteAllAlert.js';
import Button from '../../Misc/Button';


const Container = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    font-size: 4px;
    height: 10%;
`;

const ModalText = styled.div`
    color: white;
    font-size: 20px;
    padding: 20px;
    opacity: 100%;
`;

const DeleteAllCompletedButton = ({ deleteAllTaskItems, loading, error, cleanUp, listId, sortView, filterView, hasCompleted }) => {
    const [showAlert, setShowAlert] = useState(false);

    let displayError
  
    if (error) {
        displayError = {display: "block"}
    } else {
        displayError = {display: "none"}
    }

    // function toggleModal(modalState) {
    //     setShowAlert(modalState);
    // }

    function handleAlertOK() {
        deleteAllTaskItems({listId: listId, sortView: sortView, filterView: filterView});
        setShowAlert(false);
    }

    return (
        <>
        <Container> 
            <Button 
                aria-label="Delete all completed tasks" 
                disabled={!hasCompleted} 
                onClick={() => setShowAlert(true)}>
                    Delete Completed
                </Button>
            {showAlert &&
                <DeleteAllAlert onClose={() => setShowAlert(false)} onOK={() => handleAlertOK()} cancelText="Cancel" OKText="Delete" >
                    <ModalText tabIndex="0" aria-label="Are you sure you want to delete all completed tasks?">
                        Are you sure you want to delete all completed tasks?
                    </ModalText>
                </DeleteAllAlert>
            }
        </Container>
        </>
    );
}

const mapStateToProps = ({ app }) => ({
    // loading: app.deleteAllTaskItems.loading,
    // error: app.deleteAllTaskItems.error,
    listId: app.listId,
    hasCompleted: app.hasCompleted,

    sortView: app.sortView,
    filterView: app.filterView,
})

const mapDispatchToProps = {
    deleteAllTaskItems: actions.deleteAllTaskItems,
    cleanUp: actions.clean,
}
  
export default connect(mapStateToProps, mapDispatchToProps)(DeleteAllCompletedButton)

