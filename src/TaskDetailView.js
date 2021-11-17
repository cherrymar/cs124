import styled from 'styled-components';



import NewTask from './components/Tasks/NewTask';
import TabList from './components/Tabs/TabList';
import TasksSortedList from './components/Tasks/TasksSortedList';
import CustomDropdown from './components/CustomDropdown';
import DeleteAllCompletedButton from './components/DeleteAllCompletedButton';


import { devices } from './components/Design';



const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
  height: 10%;
`;

const Body = styled.div`
  @media ${devices.mobileS} { 
    // font-size: 10vw;
    margin: 5px;
  }

  @media ${devices.laptop} { 
    font-size: 2vw;
    margin: 10px;
  }

  @media ${devices.desktop} { 
    font-size: 3vw;
    margin: 10px;
  }


  height: 75%;
  z-index: 1;

  ::-webkit-scrollbar {
    display: none;
  }
  // margin: 10px 0;
  // height: 80%;
`


const Title = styled.div`
  @media ${devices.mobileS} { 
    font-size: 10vw;
  }

  @media ${devices.laptop} { 
    font-size: 5vw;
  }

//   @media ${devices.desktop} { 
//     font-size: 5vw;
//   }
  // font-size: 10vw;
  font-weight: 700;
  text-align: left;
`;

export default function TaskDetailView(props){
    return (
        <>
            <Header>
                <Title aria-label="Tasks" >Tasks</Title>
                <CustomDropdown aria-label="Sort View Dropdown" onSelectView={props.onSelectView} sortByOptions={props.sortByOptions}/>
            </Header>
            
            <Body>
                <NewTask aria-label="Add a new task" onAddTask={props.onAddTask}/>
                
                <TabList aria-label="Filter view options tab" onTabChange={props.onTabChange}>
                    <div key="All">
                    <TasksSortedList
                        aria-label="View all tasks"
                        data={props.data}
                        handleTaskFieldChanged={props.handleTaskFieldChanged} 
                        handleDeleteTask={props.handleDeleteTask}
                    />
                    </div>
                    <div key="Done">
                    <TasksSortedList
                        aria-label="View done tasks"
                        data={props.data}
                        handleTaskFieldChanged={props.handleTaskFieldChanged} 
                        handleDeleteTask={props.handleDeleteTask}
                    />
                    </div>
                    <div key="In Progress">
                    <TasksSortedList
                        aria-label="View in progress tasks"
                        data={props.data}
                        handleTaskFieldChanged={props.handleTaskFieldChanged} 
                        handleDeleteTask={props.handleDeleteTask}
                    />
                    </div>
                </TabList>

            </Body>
            
            <DeleteAllCompletedButton 
                disabled={props.disabled} 
                onDeleteAllCompletedTasks={props.onDeleteAllCompletedTasks}
            />
        </>
    )
}