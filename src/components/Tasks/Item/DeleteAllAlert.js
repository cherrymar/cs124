import React, {useState} from 'react';
import styled from 'styled-components';

// Local imports
import './DeleteAllCompletedButton';
import Button from '../../Misc/Button';


// Create custom styled components
const Backdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    background-color: black;
    opacity: 100%;
    width: 100vw;
    height: 100vh;
    color: white;
    display: flex;
`;

const Modal = styled.div`
    opacity: none;
    opacity: 1;
    background-color: rgb(46, 46, 46, 100);
    background: rgb(46, 46, 46);
    
    border-radius: 5px;
    border-color: transparent;
    border-style: none;
    margin: 0 auto;
    height: 200px;
    width: 300px;
    padding: 10px;
    position: relative;
    align-items: center;
    top: 150px;
`;

const ButtonContainer = styled.div`
    padding: 10px 10px;
    width: 70%;
    display: flex;
    justify-content: space-evenly;
    margin: auto;
`;


function DeleteAllAlert(props) {
    return (
    <Backdrop>
        <Modal>
            {props.children}
                <ButtonContainer>
                    <Button
                        aria-label={props.cancelText ? props.cancelText : "Cancel"}
                        onClick={props.onClose}>
                        {props.cancelText ? props.cancelText : "Cancel"}
                    </Button>
                    <Button
                        aria-label= {props.OKText ? props.OKText : "Ok"}
                        onClick={props.onOK}>
                        {props.OKText ? props.OKText : "Ok"}
                    </Button>
                </ButtonContainer>
        </Modal>
    </Backdrop>
    );
}

export default DeleteAllAlert;