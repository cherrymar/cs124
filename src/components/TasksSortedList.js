import react from 'react';
import TaskList from './TaskList';
import styled from 'styled-components';

const Container = styled.div`
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  height: 80vh;
`

function TasksSortedList(props) {
    let appContent;

    if (props.loading) {
        appContent = <h1>Loading</h1>
    } else if (props.value) {
        let data = props.value.docs.map((doc) => doc.data()) //props.query.orderBy(props.sortView).get().map((doc) => doc.data());
        if (props.view == "Complete") {
            data = data.filter((doc) => doc.completed);
        } else if (props.view == "Incomplete") {
            data = data.filter((doc) => !doc.completed);
        }
        
        appContent = <Container> 
                      <TaskList
                        data={data} 
                        onDeleteTask={props.handleDeleteTask}
                        onTaskFieldChanged={props.handleTaskFieldChanged}
                        view={props.view}
                      /> 
                    </Container>

    } else {
        appContent = <h1>{props.error.message}</h1>
    }





    return (
    <>
        {appContent}
    </>
    );
}

export default TasksSortedList;








/*
let appContent;

  if (loading) {
      appContent = <h1>Loading</h1>
  } else if (value) {
      let data = value.docs.map((doc) => doc.data())
      hasCompleted = data.filter(task => task.completed).length !== 0
      console.log(data.filter(task => task.completed).length !== 0)
      appContent = <> 
                    <TaskList 
                      data={data} 
                      onDeleteTask={handleDeleteTask}
                      onTaskFieldChanged={handleTaskFieldChanged}
                      view={view}
                    /> 
                    </>
      if (hasCompleted) {
        appContent = <> 
                      <TaskList 
                        data={data} 
                        onDeleteTask={handleDeleteTask}
                        onTaskFieldChanged={handleTaskFieldChanged}
                        view={view}
                      /> 
                      <DeleteAllCompletedButton disabled={view === 2} onDeleteAllCompletedTasks={handleDeleteAllCompletedTasks}/>
                      </> 
      }
  } else {
      appContent = <h1>{error.message}</h1>
  }
*/