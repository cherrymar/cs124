import * as actions from './actionTypes.js'
import { useReducer } from 'react';
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";
// import {useCollection} from "react-firebase-hooks/firestore";


const TASKS_LISTS_COLLECTION = "tasks-lists";
const TASKS_ITEMS_SUBCOLLECTION = "tasks";
const USER_COLLECTION = "users";

// https://firebase.google.com/docs/firestore/query-data/queries#array_membership

// Task actions
export const addTaskList = data => async (dispatch, getState, { getFirebase, getFirestore }) => {
    console.log("addTaskList");
    const firebase = getFirebase();
    const firestore = getFirestore();
    dispatch({ type: actions.ADD_TASKS_LIST_START });
    try {
        const user = firebase.auth().currentUser;

        await firestore.collection(TASKS_LISTS_COLLECTION).doc(data.listId).set({
            id: data.listId,
            name: data.name,
            owner: user.email,
            sharedWith: [user.email],
        });

        getTaskList(dispatch, getFirebase, getFirestore, data.sortView, data.filterView);
        dispatch({ type: actions.ADD_TASKS_LIST_SUCCESS });

    } catch(err) {
        console.log("addTaskList: ", err)
        dispatch({ type: actions.ADD_TASKS_LIST_FAIL, payload: err.message });
    }
}

export const editTaskList = data => async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    console.log("editTaskList: ")
    dispatch({ type: actions.EDIT_TASKS_LIST_START });
    try {
        await firestore.collection(TASKS_LISTS_COLLECTION).doc(data.id).update({
            ["name"]: data.name,
        });

    getTaskList(dispatch, getFirebase, getFirestore, data.sortView, data.filterView);
    dispatch({ type: actions.EDIT_TASKS_LIST_SUCCESS });
    } catch(err) {
        console.log("editTaskList: ", err)
        dispatch({ type: actions.EDIT_TASKS_LIST_FAIL, payload: err.message });
    }
}

export const deleteTaskList = data => async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    dispatch({ type: actions.DELETE_TASKS_LIST_START });
    try {
        const snapshot = await firestore.collection(TASKS_LISTS_COLLECTION).doc(data.listId).collection(TASKS_ITEMS_SUBCOLLECTION).get();
        snapshot.forEach(doc => {
            firestore.collection(TASKS_LISTS_COLLECTION).doc(data.listId).collection(TASKS_ITEMS_SUBCOLLECTION).doc(doc.id).delete();
        });
        firestore.collection(TASKS_LISTS_COLLECTION).doc(data.listId).delete();
       
        getTaskList(dispatch, getFirebase, getFirestore, data.sortView, data.filterView);
        dispatch({ type: actions.DELETE_TASKS_LIST_SUCCESS });

    } catch(err) {
        console.log("deleteTaskList: ", err)
        dispatch({ type: actions.DELETE_TASKS_LIST_FAIL, payload: err.message });
    }
}

export const shareTaskList = data => async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    dispatch({ type: actions.SHARE_TASKS_LIST_START });
    try {
        // console.log("sharing", data.listId, data.shareEmail);
        const user = firebase.auth().currentUser;
        let owner = "";
        await firestore
            .collection(TASKS_LISTS_COLLECTION)
            .doc(data.listId)
            .get()
            .then((querySnapshot) => {
                owner = querySnapshot.data().owner;
            });
        console.log("owner: ", owner);
        let sharedWith = [];
        await firestore
        .collection(TASKS_LISTS_COLLECTION)
        .doc(data.listId)
        .get()
        .then((querySnapshot) => {
            sharedWith = querySnapshot.data().sharedWith;
        });        
        // console.log("original shared with: ", sharedWith);
        // console.log(user, user.email);

        if (owner == user.email) {
            sharedWith.push(data.shareEmail);
            // console.log("added share: ", sharedWith);
            await firestore.collection(TASKS_LISTS_COLLECTION).doc(data.listId).update({
                ["sharedWith"]: sharedWith
            });
            
            getTaskList(dispatch, getFirebase, getFirestore, data.sortView, data.filterView);
            getTaskItems(dispatch, getFirebase, getFirestore, data.listId, data.sortView, data.filterView);
            dispatch({ type: actions.SHARE_TASKS_LIST_SUCCESS });
        } else {
            dispatch({ type: actions.SHARE_TASKS_LIST_FAIL, payload: "You do not own this task list." });
        }

        
        
    } catch(err) {
        console.log(err)
        dispatch({ type: actions.SHARE_TASKS_LIST_FAIL, payload: err.message });
    }
}

export const unshareTaskList = data => async (dispatch, getState, { getFirebase, getFirestore }) => {
    // const firebase = getFirebase();
    // const firestore = getFirestore();
    // dispatch({ type: actions.UNSHARE_TASKS_LIST_START });
    // try {
    //     let sharedWith = firestore.collection(TASKS_LISTS_COLLECTION).doc(data.listId).collection(TASKS_ITEMS_SUBCOLLECTION).doc(data.taskId).get("sharedWith");
    //     sharedWith.filter((id) => id !== data.unfriendId);

    //     await firestore.collection(TASKS_LISTS_COLLECTION).doc(data.id).update({
    //         ["sharedWith"]: sharedWith
    //     });

    //     const user = firebase.auth().currentUser;
    //     const tasksList = firestore.collection(TASKS_LISTS_COLLECTION).where('sharedWith', "array-contains", user.uid).orderBy("name");
    //     dispatch({ type: actions.UNSHARE_TASKS_LIST_SUCCESS, tasksLists: tasksList  });

    // } catch(err) {
    //     dispatch({ type: actions.UNSHARE_TASKS_LIST_FAIL, payload: err.message });
    // }
}

export const addTaskItem = data => async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    dispatch({ type: actions.ADD_TASK_START });
    try {
        const id = generateUniqueID();
        await firestore.collection(TASKS_LISTS_COLLECTION).doc(data.listId).collection(TASKS_ITEMS_SUBCOLLECTION).doc(id).set({
            id: id,
            description: data.description,
            completed: false,
            priority: data.priority, 
            dateCreated: firebase.firestore.Timestamp.now(),
        });

        getTaskList(dispatch, getFirebase, getFirestore, data.sortView, data.filterView);
        getTaskItems(dispatch, getFirebase, getFirestore, data.listId, data.sortView, data.filterView);
        dispatch({ type: actions.ADD_TASK_SUCCESS});

    } catch(err) {
        console.log("addTaskItem: ", err)
        dispatch({ type: actions.ADD_TASK_FAIL, payload: err.message });
    }
}


export const editTaskItem = data => async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    dispatch({ type: actions.EDIT_TASK_START });
    try {
        await firestore.collection(TASKS_LISTS_COLLECTION).doc(data.listId).collection(TASKS_ITEMS_SUBCOLLECTION).doc(data.taskId).update({[data.field]: data.value});
        
        getTaskList(dispatch, getFirebase, getFirestore, data.sortView, data.filterView);
        getTaskItems(dispatch, getFirebase, getFirestore, data.listId, data.sortView, data.filterView);
        dispatch({ type: actions.EDIT_TASK_SUCCESS });

    } catch(err) {
        console.log("editTaskItem: ", err)
        dispatch({ type: actions.EDIT_TASK_FAIL, payload: err.message });
    }
}

export const deleteTaskItem = data => async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    dispatch({ type: actions.DELETE_TASK_START });
    try {
        await firestore.collection(TASKS_LISTS_COLLECTION).doc(data.listId).collection(TASKS_ITEMS_SUBCOLLECTION).doc(data.taskId).delete();
        
        getTaskList(dispatch, getFirebase, getFirestore, data.sortView, data.filterView);
        getTaskItems(dispatch, getFirebase, getFirestore, data.listId, data.sortView, data.filterView);
        dispatch({ type: actions.DELETE_TASK_SUCCESS });

    } catch(err) {
        console.log("deleteTaskItem: ", err)
        dispatch({ type: actions.DELETE_TASK_FAIL, payload: err.message });
    }
}

export const deleteAllTaskItems = data => async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    dispatch({ type: actions.DELETE_ALL_TASKS_START });
    try {
        const snapshot = await firestore.collection(TASKS_LISTS_COLLECTION).doc(data.listId).collection(TASKS_ITEMS_SUBCOLLECTION).get();
        snapshot.forEach(doc => {
            firestore.collection(TASKS_LISTS_COLLECTION).doc(data.listId).collection(TASKS_ITEMS_SUBCOLLECTION).doc(doc.id).delete();
        });

        getTaskList(dispatch, getFirebase, getFirestore, data.sortView, data.filterView);
        getTaskItems(dispatch, getFirebase, getFirestore, data.listId, data.sortView, data.filterView);
        dispatch({ type: actions.DELETE_ALL_TASKS_SUCCESS });

    } catch(err) {
        console.log("deleteAllTaskItems: ", err)
        dispatch({ type: actions.DELETE_ALL_TASKS_FAIL, payload: err.message });
    }
}

// Friend Item
export const addFriend = data => async (dispatch, getState, { getFirebase, getFirestore }) => {
    // const firebase = getFirebase();
    // const firestore = getFirestore();
    // dispatch({ type: actions.ADD_FRIEND_START });
    // try {
    //     const user = firebase.auth().currentUser;

    //     let friendRequests = await firestore.collection(USER_COLLECTION).doc(data.friendId).get("friendRequests");
    //     friendRequests.append(user.uid);

    //     firestore.collection(USER_COLLECTION).doc(data.friendId).update({
    //         ["friendRequests"]: friendRequests
    //     })

    //     dispatch({ type: actions.ADD_FRIEND_SUCCESS });

    // } catch(err) {
    //     dispatch({ type: actions.ADD_FRIEND_FAIL, payload: err.message });
    // }
}

export const deleteFriend = data => async (dispatch, getState, { getFirebase, getFirestore }) => {
    // const firebase = getFirebase();
    // const firestore = getFirestore();
    // dispatch({ type: actions.DELETE_FRIEND_START });
    // try {
    //     const user = firebase.auth().currentUser;

    //     let userFriends = await firestore.collection(USER_COLLECTION).doc(user.uid).get("friendRequests");
    //     userFriends.filter(friendId => friendId != data.unfriendId);
    //     firestore.collection(USER_COLLECTION).doc(user.uid).update({
    //         ["friendRequests"]: userFriends
    //     })

    //     let unfriendFriends = firestore.collection(USER_COLLECTION).doc(data.friendId).get("friendRequests");
    //     unfriendFriends.filter(friendId => friendId != user.uid);
    //     firestore.collection(USER_COLLECTION).doc(data.friendId).update({
    //         ["friendRequests"]: unfriendFriends
    //     })

    //     dispatch({ type: actions.DELETE_FRIEND_SUCCESS });

    // } catch(err) {
    //     dispatch({ type: actions.DELETE_FRIEND_FAIL, payload: err.message });
    // }
}

export const acceptFriend = data => async (dispatch, getState, { getFirebase, getFirestore }) => {
    // const firebase = getFirebase();
    // const firestore = getFirestore();
    // dispatch({ type: actions.ACCEPT_FRIEND_START });
    // try {
    //     const user = firebase.auth().currentUser;

    //     let userFriends = await firestore.collection(USER_COLLECTION).doc(user.uid).get("friends");
    //     userFriends.append(data.friendId);
    //     firestore.collection(USER_COLLECTION).doc(user.uid).update({
    //         ["friends"]: userFriends
    //     })

    //     let friendFriends = firestore.collection(USER_COLLECTION).doc(data.friendId).get("friends");
    //     friendFriends.append(user.uid);
    //     firestore.collection(USER_COLLECTION).doc(data.friendId).update({
    //         ["friends"]: friendFriends
    //     })

    //     let requests = firestore.collection(USER_COLLECTION).doc(user.uid).get("friendRequests");
    //     requests.filter(friendId => friendId != data.friendId);
    //     firestore.collection(USER_COLLECTION).doc(user.uid).update({
    //         ["friendRequests"]: requests
    //     })

    //     let invites = firestore.collection(USER_COLLECTION).doc(data.friendId).get("friendInvites");
    //     invites.append(friendId => friendId != user.uid);
    //     firestore.collection(USER_COLLECTION).doc(data.friendId).update({
    //         ["friendInvites"]: invites
    //     })

    //     dispatch({ type: actions.ACCEPT_FRIEND_SUCCESS });

    // } catch(err) {
    //     dispatch({ type: actions.ACCEPT_FRIEND_FAIL, payload: err.message });
    // }
}

export const selectList = data => async (dispatch, getState, { getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;
    console.log("selectList", data.listName);
    if (data.onListSelected) {
        dispatch({ 
            type: actions. SELECT_TASK_LIST, 
            listId: data.listId, 
            listName: data.listName, 
            onListSelected: data.onListSelected
        })
        getTaskItems(dispatch, getFirebase, getFirestore, data.listId, data.sortView, data.filterView);
    } else {
        dispatch({ 
            type: actions.SELECT_TASK_LIST, 
            listId: null, 
            taskItems: null, 
            listName: null, 
            onListSelected: false
        })
    }
}

export const getLists = data => async (dispatch, getState, { getFirebase, getFirestore }) => {
    console.log("getLists");
    getTaskList(dispatch, getFirebase, getFirestore, data.sortView, data.filterView);
}

export const getItems = data => async (dispatch, getState, { getFirebase, getFirestore }) => {
    getTaskItems(dispatch, getFirebase, getFirestore, data.listId, data.sortView, data.filterView);
}

export const appCleanUp = data => (dispatch) => {
    dispatch({ type: actions.LOGOUT_CLEAN_UP})
}

export const setSortByView = data => async (dispatch, getState, { getFirebase, getFirestore }) => {
    getTaskItems(dispatch, getFirebase, getFirestore, data.listId, data.sortView, data.filterView);
    dispatch({ type: actions.SET_SORT_VIEW, sortView: data.sortView})
}

export const setFilterByView = data => async (dispatch, getState, { getFirebase, getFirestore }) => {
    getTaskItems(dispatch, getFirebase, getFirestore, data.listId, data.sortView, data.filterView);
    dispatch({ type: actions.SET_FILTER_VIEW, filterView: data.filterView})
}


// Helper functions
async function getTaskList(dispatch, getFirebase, getFirestore) {
    console.log("getTaskList");
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;

    let taskListData = [];
    await firestore
        .collection(TASKS_LISTS_COLLECTION)
        .where('sharedWith', "array-contains", user.email)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                taskListData.push(doc.data());
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });

    dispatch({ 
        type: actions.GET_TASK_LISTS, 
        tasksLists: taskListData
    })
}

async function getTaskItems(dispatch, getFirebase, getFirestore, listId, sortView, filterView) {
    console.log("getTaskItems", listId, sortView, filterView);
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;

    let tasksItems = []
    
    if (sortView === "priority") {
        await firestore
        .collection(TASKS_LISTS_COLLECTION)
        .doc(listId)
        .collection(TASKS_ITEMS_SUBCOLLECTION)
        .orderBy(sortView, "desc")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((document) => {
                tasksItems.push(document.data());
            });
        });
    } else {
        await firestore
        .collection(TASKS_LISTS_COLLECTION)
        .doc(listId)
        .collection(TASKS_ITEMS_SUBCOLLECTION)
        .orderBy(sortView)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((document) => {
                tasksItems.push(document.data());
            });
        });
    }

    if (filterView === "In Progress") {
        tasksItems = tasksItems.filter((doc) => !doc.completed)
    } else if (filterView === "Done") {
        tasksItems = tasksItems.filter((doc) => doc.completed)
    }

    let hasCompleted = tasksItems.filter((doc) => doc.completed).length != 0;
    
    dispatch({ 
        type: actions.GET_TASK_ITEMS, 
        tasksItems: tasksItems,
        hasCompleted: hasCompleted,
    })
}

