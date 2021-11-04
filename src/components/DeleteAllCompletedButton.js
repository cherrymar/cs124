import React, {useState} from 'react';
import styled from 'styled-components';

// Local imports
import Alert from './Alert.js';
import OurButton from './OurButton';
import './Alert.css';


const Container = styled.div`
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
        <OurButton disabled={props.disabled} onClick={() => toggleModal(!showAlert)}>Delete Completed</OurButton>
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


