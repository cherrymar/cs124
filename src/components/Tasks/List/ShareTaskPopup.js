import React, {useState} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';


// Local imports

import * as actions from '../../../backend/store/actions';
import Button from '../../Misc/Button';
import AutoResizeTextArea from '../../Misc/AutoResizeTextArea';


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
    z-index: 1;
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
    height: 300px;
    width: 500px;
    padding: 10px;
    position: relative;
    align-items: center;
    top: 150px;

    z-index: 1;
`;

const ButtonContainer = styled.div`
    padding: 10px 10px;
    width: 70%;
    display: flex;
    justify-content: space-evenly;
    margin: auto;
`;

const Input = styled.input`
    width: 60%;
    height: 20px;
    font-size: 15px;
`;

const Text = styled.div`
    color: white;
    font-size: 20px;
    padding: 20px;
    opacity: 100%;

`;

const InputContainer = styled.div`
    display: flex;
    // justify-content: space-between;
    align-items: center;
`;

const ShareTaskPopup = ({ onOK, onClose, OKText, cancelText, loading, error, cleanUp, listId, sortView, filterView, children }) => {

    const [email, setEmail] = useState("")


    function handleSubmit() {
        onOK({listId: listId, shareEmail: email, sortView: sortView, filterView: filterView})
        // selectList({listId: id, name: listName, onListSelected: true, sortView: sortView, filterView: filterView})
        // addTaskList({name: listName, listId: id, sortView: sortView, filterView: filterView})
        setEmail("");
    }

    function handleCancel() {
        setEmail("")
        onClose()
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    }


    return (
    <Backdrop>
        <Modal>
            {children}
                <InputContainer>
                    <Text> Share with: </Text>
                    <Input 
                        aria-label="share with"
                        completed={"false"} 
                        placeholder="email" 
                        value={email} 
                        onChange={event => setEmail(event.target.value)} 
                        onKeyDown={handleKeyDown}
                    />
                </InputContainer>
                <ButtonContainer>
                    
                    <Button
                        aria-label={cancelText ? cancelText : "Cancel"}
                        onClick={() => handleCancel()}>
                        {cancelText ? cancelText : "Cancel"}
                    </Button>
                    <Button
                        aria-label= {OKText ? OKText : "Ok"}
                        onClick={() => handleSubmit()}>
                        {OKText ? OKText : "Ok"}
                    </Button>
                </ButtonContainer>
        </Modal>
    </Backdrop>
    );
}

const mapStateToProps = ({ app }) => ({
    loading: app.addTaskList.loading,
    error: app.addTaskList.error,

    listId: app.listId,

    sortView: app.sortView,
    filterView: app.filterView,
})

const mapDispatchToProps = {
    // shareTaskList: actions.shareTaskList,
    cleanUp: actions.clean,
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ShareTaskPopup)