// import React, {useState, useEffect} from 'react';
// // import styled from 'styled-components';

// import { connect } from 'react-redux'

// import * as actions from '../../../backend/store/actions';
// import Button from '../../Misc/Button';
// import AutoResizeTextArea from '../../Misc/AutoResizeTextArea';



// const EditTaskList = ({ editTaskList, setListName, setListId, onSelectingListView, loading, error, cleanUp }) => {
//     const [listName, setStateListName] = useState("");
//     let displayError
  
//     if (error) {
//         displayError = {display: "block"}
//         console.log(error);
//     } else {
//         displayError = {display: "none"}
//     }
    
//     useEffect(() => {
//         return () => {
//             cleanUp()
//         }
//     }, [cleanUp])
        
  
//     function handleSubmit() {
//         addTaskList({"name": listName})
//         setListName(taskListName);
//         onSelectingListView(false);
//         // setListId(id);
//         setStateListName("");
//     }

//     const handleKeyDown = (event) => {
//         if (event.key === 'Enter') {
//             handleSubmit();
//         }
//     }

//     return (
//         <div className="add-task-list-container">
//             <AutoResizeTextArea 
//                 aria-label="New task list name"
//                 completed={"false"} 
//                 placeholder="New task list" 
//                 value={listName} 
//                 onChange={event => setStateListName(event.target.value)} 
//                 onKeyDown={() => handleKeyDown()}
//             /> 
            
//             <Button 
//                 aria-label="Add new task list"
//                 className="submitButton" 
//                 disabled={listName===""} 
//                 variant="contained" 
//                 onClick={() => handleSubmit()}
//             >
//                 Add
//             </Button>
//         </div>
//     );
// }

// const mapStateToProps = ({ app }) => ({
//     loading: app.editTaskList.loading,
//     error: app.editTaskList.error,

//     sortView: app.sortView,
//     filterView: app.filterView,
// })

// const mapDispatchToProps = {
//     editTaskList: actions.editTaskList,
//     cleanUp: actions.clean,
// }
  
// export default connect(mapStateToProps, mapDispatchToProps)(EditTaskList)