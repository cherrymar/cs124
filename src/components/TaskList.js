import React, {useState} from 'react';
import TaskItem from './TaskItem';

function TaskList(props) {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <>

          <div>
            {props.data.map(a => <TaskItem
                onRowClick={(id) =>
                    setSelectedId(id)}
                onTaskFieldChanged={props.onTaskFieldChanged}
                selected={a.id === selectedId}
                key={a.id}
                {...a} />)}
            
            {selectedId && <button type="button" onClick={
                () => {
                    props.onDeleteTask(selectedId);
                    setSelectedId(null);
                }}>
                Delete Selected
            </button>}
            {/* <button type="button" onClick={props.onAddPerson}>
                Add
            </button> */}
          </div>






    </>
  );
}

export default TaskList;
