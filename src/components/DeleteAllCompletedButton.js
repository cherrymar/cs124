import React from 'react';
import styled from 'styled-components';

import Button from '@mui/material/Button';
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/core/ButtonUnstyled';
import { ButtonBase } from '@mui/material';



import Alert from './Alert.js';
import './Alert.css';
import react, {useState} from 'react';


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
    
    
`;

const CustomButtonRoot = styled('button')(`
  background-color: #1976d2;
  padding: 15px 20px;
  border-radius: 10px;
  color: #fff;
  font-weight: 600;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 14px;
  transition: all 200ms ease;
  cursor: pointer;
  box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 0 rgba(0, 127, 255, 0);
  border: none;

  &:hover {
    background-color: #0059b2;
  }

  &.${buttonUnstyledClasses.active} {
    background-color: #1976d2;
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: 0 0 0 0 rgba(0, 127, 255, 0);
  }
`);

const ModalText = styled.div`
  color: black;
  font-size: 30px;
`;


const StyledButton = styled(Button)`


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
            <Button variant="contained" onClick={() => toggleModal(!showAlert)} sx={{fontSize: 10}}>Delete Completed</Button>

            {showAlert && <Alert onClose={() => toggleModal(false)} onOK={() => handleAlertOK()} cancelText="Cancel" OKText="Delete" >
                <ModalText>
                    Are you sure you want to delete all tasks?
                </ModalText>
            </Alert>}
        </Container>
        
    </>
  );
}

export default DeleteAllCompletedButton;


