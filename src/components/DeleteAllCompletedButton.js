import React, {useState} from 'react';
import styled from 'styled-components';

// Local imports
import Alert from './Alert.js';
import OurButton from './OurButton';


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


function DeleteAllCompletedButton(props) {
  const [showAlert, setShowAlert] = useState(false);

  function toggleModal(modalState) {
    setShowAlert(modalState);
  }

  function handleAlertOK() {
    props.onDeleteAllCompletedTasks();
    toggleModal(false);
  }

  return (
    <>
      <Container> 
        <OurButton aria-label="Delete all completed tasks" disabled={props.disabled} onClick={() => toggleModal(true)}>Delete Completed</OurButton>
        {showAlert &&
          <Alert onClose={() => toggleModal(false)} onOK={() => handleAlertOK()} cancelText="Cancel" OKText="Delete" >
            <ModalText tabIndex="0" aria-label="Are you sure you want to delete all completed tasks?">
              Are you sure you want to delete all completed tasks?
            </ModalText>
          </Alert>
        }
      </Container>
    </>
  );
}

export default DeleteAllCompletedButton;


