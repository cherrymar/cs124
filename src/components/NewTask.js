import React, {useState} from 'react';
import styled from 'styled-components';


const NewItem = styled.input`
    outline: none;
    width: 90%;
    font-size: 4vw;
    border: none;
    border-bottom: 2px solid black;
    padding: 0px;
    margin: 40px;
    &:focus {
        border-bottom: 2px solid cornflowerblue;
    }
`;


function NewTask(props) {
    const [taskDescription, setTaskDescription] = useState("");
    
    function handleSubmit() {
        props.onAddTask(taskDescription)
        setTaskDescription("")
    }

    return (
    <>
        {/* <form onSubmit={handleSubmit}> */}
            <NewItem placeholder="New task" value={taskDescription} onChange={event => setTaskDescription(event.target.value)}/> 
            <button onClick={handleSubmit}>Submit</button>
            {/* <input type="submit" value="Submit" /> */}
        {/* </form> */}
        
    </>
  );
}

export default NewTask;
