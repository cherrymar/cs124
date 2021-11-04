import React, {useState} from 'react';
import styled from 'styled-components';

import Button from '@mui/material/Button';
// import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/core/ButtonUnstyled';
// import { ButtonBase } from '@mui/material';

import Alert from './Alert.js';
import OurButton from './OurButton';
import './Alert.css';

// import react, {useState} from 'react';


const Container = styled.div`
    // display: flex;
    // justifyContent: flex-end;
    // position: relative;
    // right: 0;
    // bottom: 0;
    // margin: 50px;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    font-size: 4px;
    height: 10%;
    
    
`;


const ModalText = styled.div`
  color: black;
  font-size: 30px;
`;



function DeleteAllCompletedButton(props) {
    const [showAlert, setShowAlert] = useState(false);

    function toggleModal(modalState) {
        setShowAlert(modalState)
    }

    function handleAlertOK() {
        toggleModal(false)
        props.onDeleteAllCompletedTasks()
    }


    
  return (
    <>
        <Container>
            {/* <ButtonBase>ButtonBase</ButtonBase>
            <CustomButtonRoot>Button</CustomButtonRoot>
            <ButtonUnstyled {...props} component={CustomButtonRoot} >Delete All Completed</ButtonUnstyled> */}
            <OurButton disabled={props.disabled} onClick={() => toggleModal(!showAlert)}>Delete Completed</OurButton>
            {/* <Button disabled={props.disabled} variant="contained" onClick={() => toggleModal(!showAlert)} sx={{fontSize: 10}}>Delete Completed</Button> */}

            {showAlert && <Alert onClose={() => toggleModal(false)} onOK={() => handleAlertOK()} cancelText="Cancel" OKText="Delete" >
                <ModalText>
                    Are you sure you want to delete all completed tasks?
                </ModalText>
            </Alert>}
        </Container>
        
    </>
  );
}

export default DeleteAllCompletedButton;


