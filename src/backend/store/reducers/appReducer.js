import * as actions from '../actions/actionTypes.js'

const initialState = {
    error: null,
    loading: false,
    type: null,

    friendsQuery: false,
    tasksLists: null,
    tasksItems: null,

    listId: null,
    listName: null,
    onListSelected: false,

    sortView: "description",
    filterView: "All",
    hasCompleted: false,

    // currentListId: null,

    addTaskList: {
        error: null,
        loading: false,
    },

    editTaskList: {
        error: null,
        loading: false,
    },

    deleteTaskList: {
        error: null,
        loading: false,
    },

    shareTaskList: {
        error: null,
        loading: false,
    },

    // unshareTaskList: {
    //     error: null,
    //     loading: false,
    // },
    
    addTaskItem: {
        error: null,
        loading: false,
    },

    editTaskItem: {
        error: null,
        loading: false,
    },

    deleteTaskItem: {
        error: null,
        loading: false,
    },

    // addFriend: {
    //     error: null,
    //     loading: false,
    // },

    // deleteFriend: {
    //     error: null,
    //     loading: false,
    // },

    // acceptFriend: {
    //     error: null,
    //     loading: false,
    // },
}

export default (state = initialState, {
        type, payload, 
        tasksLists, tasksItems, 
        listId, listName, onListSelected,
        sortView, filterView,
        hasCompleted
    }) => {


    switch (type) {
        case actions.ADD_TASKS_LIST_START:
            return{
                ...state,
                addTaskList: { ...state.addTaskList, loading: true },
            };
        case actions.ADD_TASKS_LIST_FAIL:
            return{
                ...state,
                addTaskList: { ...state.addTaskList, loading: false, error: payload, },
            };
        case actions.ADD_TASKS_LIST_SUCCESS:
            return{
                ...state,
                // tasksLists: tasksLists, 
                // tasksItems: tasksItems, 
                addTaskList: { 
                    ...state.addTaskList, 
                    loading: false, 
                    error: false,  
                },
            };

        case actions.EDIT_TASKS_LIST_START:
            return{
                ...state,
                editTaskList: { ...state.editTaskList, loading: true },
            };
        case actions.EDIT_TASKS_LIST_FAIL:
            return{
                ...state,
                editTaskList: { ...state.editTaskList, loading: false, error: payload, },
            };
        case actions.EDIT_TASKS_LIST_SUCCESS:
            return{
                ...state, 
                // tasksLists: tasksLists,
                editTaskList: { 
                    ...state.editTaskList,
                    loading: false, 
                    error: false,  
                },
            };

        case actions.DELETE_TASKS_LIST_START:
            return{
                ...state,
                deleteTaskList: { ...state.deleteTaskList, loading: true },
            };
        case actions.DELETE_TASKS_LIST_FAIL:
            return{
                ...state,
                deleteTaskList: { ...state.deleteTaskList, loading: false, error: payload, },
            };
        case actions.DELETE_TASKS_LIST_SUCCESS:
            return{
                ...state,
                // tasksLists: tasksLists, 
                deleteTaskList: { 
                    ...state.deleteTaskList, 
                    loading: false, error: false,  
                },
            };

        case actions.ADD_TASK_START:
            return{
                ...state,
                addTaskItem: { ...state.addTaskItem, loading: true },
            };
        case actions.ADD_TASK_FAIL:
            return{
                ...state,
                addTaskItem: { ...state.addTaskItem, loading: false, error: payload, },
            };
        case actions.ADD_TASK_SUCCESS:
            return{
                ...state,
                // tasksLists: tasksLists, 
                // tasksItems: tasksItems, 
                addTaskItem: { 
                    ...state.addTaskItem, 
                    loading: false, 
                    error: false,  
                },
            };
    
        case actions.EDIT_TASK_START:
            return{
                ...state,
                editTaskItem: { ...state.editTaskItem, loading: true },
            };
        case actions.EDIT_TASK_FAIL:
            return{
                ...state,
                editTaskItem: { ...state.editTaskItem, loading: false, error: payload, },
            };
        case actions.EDIT_TASK_SUCCESS:
            return{
                ...state, 
                // tasksLists: tasksLists, 
                // tasksItems: tasksItems, 
                editTaskItem: { 
                    ...state.editTaskItem,
                    loading: false, 
                    error: false,  
                },
            };
        
        case actions.DELETE_TASK_START:
            return{
                ...state,
                deleteTaskItem: { ...state.deleteTaskItem, loading: true },
            };
        case actions.DELETE_TASK_FAIL:
            return{
                ...state,
                deleteTaskItem: { ...state.deleteTaskItem, loading: false, error: payload, },
            };
        case actions.DELETE_TASK_SUCCESS:
            return{
                ...state,
                // tasksLists: tasksLists, 
                // tasksItems: tasksItems, 
                deleteTaskItem: { 
                    ...state.deleteTaskItem,
                    loading: false, error: false,  
                },
            };

        // case actions.ADD_FRIEND_START:
        //     return{
        //         ...state,
        //         addFriend: { ...state.addFriend, loading: true },
        //     };
        // case actions.ADD_FRIEND_FAIL:
        //     return{
        //         ...state,
        //         addFriend: { ...state.addFriend, loading: false, error: payload, },
        //     };
        // case actions.ADD_FRIEND_SUCCESS:
        //     return{
        //         ...state,
        //         addFriend: { ...state.addFriend, loading: false, error: false,  },
        //     };

        // case actions.ACCEPT_FRIEND_START:
        //     return{
        //         ...state,
        //         acceptFriend: { ...state.acceptFriend, loading: true },
        //     };
        // case actions.ACCEPT_FRIEND_FAIL:
        //     return{
        //         ...state,
        //         acceptFriend: { ...state.acceptFriend, loading: false, error: payload, },
        //     };
        // case actions.ACCEPT_FRIEND_SUCCESS:
        //     return{
        //         ...state,
        //         acceptFriend: { ...state.acceptFriend, loading: false, error: false,  },
        //     };

        // case actions.DELETE_FRIEND_START:
        //     return{
        //         ...state,
        //         deleteFriend: { ...state.deleteFriend, loading: true },
        //     };
        // case actions.DELETE_FRIEND_FAIL:
        //     return{
        //         ...state,
        //         deleteFriend: { ...state.deleteFriend, loading: false, error: payload, },
        //     };
        // case actions.DELETE_FRIEND_SUCCESS:
        //     return{
        //         ...state,
        //         deleteFriend: { ...state.deleteFriend, loading: false, error: false,  },
        //     };

        case actions.SHARE_TASKS_LIST_START:
            return{
                ...state,
                shareTaskList: { ...state.shareTaskList, loading: true },
            };
        case actions.SHARE_TASKS_LIST_FAIL:
            return{
                ...state,
                shareTaskList: { ...state.shareTaskList, loading: false, error: payload, },
            };
        case actions.SHARE_TASKS_LIST_SUCCESS:
            return{
                ...state,
                shareTaskList: { ...state.shareTaskList, loading: false, error: false,  },
            };
        
        // case actions.UNSHARE_TASKS_LIST_START:
        //     return{
        //         ...state,
        //         unshareTaskList: { ...state.unshareTaskList, loading: true },
        //     };
        // case actions.UNSHARE_TASKS_LIST_FAIL:
        //     return{
        //         ...state,
        //         unshareTaskList: { ...state.unshareTaskList, loading: false, error: payload, },
        //     };
        // case actions.UNSHARE_TASKS_LIST_SUCCESS:
        //     return{
        //         ...state,
        //         unshareTaskList: { ...state.unshareTaskList, loading: false, error: false,  },
        //     };
        
        
        case actions.SELECT_TASK_LIST:
            return{
                ...state,
                listId: listId,
                // tasksItems: tasksItems,
                listName: listName,
                onListSelected: onListSelected,
            };

        case actions.GET_TASK_LISTS:
            return{
                ...state,
                tasksLists: tasksLists
            };

        case actions.GET_TASK_ITEMS:
            return{
                ...state, 
                tasksItems: tasksItems,
                hasCompleted: hasCompleted
            }

        case actions.SET_SORT_VIEW:
            return {
                ...state,
                sortView: sortView
            }

        case actions.SET_FILTER_VIEW:
            return {
                ...state, 
                filterView: filterView
            }

        case actions.LOGOUT_CLEAN_UP:
            return{
                error: null,
                loading: false,
                type: null,
            
                friendsQuery: false,
                tasksLists: null,
                tasksItems: null,
            
                listId: null,
                listName: null,
                onListSelected: false,
            
                sortView: "description",
                filterView: "All",
                hasCompleted: false,
            
                // currentListId: null,
            
                addTaskList: {
                    error: null,
                    loading: false,
                },
            
                editTaskList: {
                    error: null,
                    loading: false,
                },
            
                deleteTaskList: {
                    error: null,
                    loading: false,
                },
            
                shareTaskList: {
                    error: null,
                    loading: false,
                },
            
                // unshareTaskList: {
                //     error: null,
                //     loading: false,
                // },
                
                addTaskItem: {
                    error: null,
                    loading: false,
                },
            
                editTaskItem: {
                    error: null,
                    loading: false,
                },
            
                deleteTaskItem: {
                    error: null,
                    loading: false,
                },
            }



        case actions.CLEAN_UP:
            return { 
                ...state, 
                error: null,
                loading: false,
                type: null,

                addTaskList: {
                    ...state.addTaskList,
                    error: null,
                    loading: false,
                },

                editTaskList: {
                    ...state.editTaskList,
                    error: null,
                    loading: false,
                },

                deleteTaskList: {
                    ...state.deleteTaskList,
                    error: null,
                    loading: false,
                },

                shareTaskList: {
                    ...state.shareTaskList,
                    error: null,
                    loading: false,
                },

                // unshareTaskList: {
                //     ...state.unshareTaskList,
                //     error: null,
                //     loading: false,
                // },
                
                addTaskItem: {
                    ...state.addTaskItem,
                    error: null,
                    loading: false,
                },

                editTaskItem: {
                    ...state.editTaskItem,
                    error: null,
                    loading: false,
                },

                deleteTaskItem: {
                    ...state.deleteTaskItem,
                    error: null,
                    loading: false,
                },

                // addFriend: {
                //     ...state.addFriend,
                //     error: null,
                //     loading: false,
                // },

                // deleteFriend: {
                //     ...state.deleteFriend,
                //     error: null,
                //     loading: false,
                // },

                // acceptFriend: {
                //     ...state.acceptFriend,
                //     error: null,
                //     loading: false,
                // },
            } 

        default:
            return state
    }
}