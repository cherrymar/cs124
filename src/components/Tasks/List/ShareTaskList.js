import React, {useState} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';

// Local imports
import * as actions from '../../../backend/store/actions';

import ShareTaskPopup from './ShareTaskPopup.js';
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

const ShareTaskList = ({ shareTaskList, listName, loading, error, cleanUp, listId, sortView, filterView, hasCompleted }) => {
    const [showAlert, setShowAlert] = useState(false);

    let displayError
  
    if (error) {
        displayError = {display: "block"}
    } else {
        displayError = {display: "none"}
    }

    function handleAlertOK(data) {
        shareTaskList(data)
        setShowAlert(false);
    }

    return (
        <>
        <Container> 
            <IconButton 
                aria-label="Share task list" 
                size="small" 
                onClick={() => setShowAlert(true)}
            >
                <ShareIcon fontSize="small" sx={{color: "lightgray"}}/>
            </IconButton>
            {showAlert &&
                <ShareTaskPopup onClose={() => setShowAlert(false)} onOK={(data) => handleAlertOK(data)} cancelText="Cancel" OKText="Share" >
                    <ModalText tabIndex="0" aria-label="Who would you like to share this task list with?" >
                        Who would you like to share the task list "{listName}" with? 
                    </ModalText>
                </ShareTaskPopup>
            }
        </Container>
        </>
    );
}

const mapStateToProps = ({ app }) => ({
    // loading: app.deleteAllTaskItems.loading,
    // error: app.deleteAllTaskItems.error,
    listId: app.listId,
    listName: app.listName,

    sortView: app.sortView,
    filterView: app.filterView,
})

const mapDispatchToProps = {
    shareTaskList: actions.shareTaskList,
    cleanUp: actions.clean,
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ShareTaskList)

