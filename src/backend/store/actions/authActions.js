import * as actions from './actionTypes.js'
import { useReducer } from 'react';


const USER_COLLECTION = "users";

// SignUp action
export const signUp = data => async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    dispatch({ type: actions.AUTH_START_EMAIL });
    try {
        const res = await firebase
            .auth()
            .createUserWithEmailAndPassword(data.email, data.password);

        // Send verification email
        const user = firebase.auth().currentUser;
        await user.sendEmailVerification();

        await firestore.collection(USER_COLLECTION).doc(res.user.uid).set({ 
            id: res.user.uid,
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username,
            email: data.email,
            friends: [],
            friendRequests: [],
            friendInvites: [],
        });

        dispatch({ type: actions.AUTH_SUCCESS, id: res.user.uid });

    } catch(err) {
        dispatch({ type: actions.AUTH_FAIL, payload: err.message });
    }
}

// LogOut action
export const logOut = () => async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    try {
        await firebase.auth().signOut();

    } catch (err) {
        console.log(err.message);
    }
}

// LogIn action
export const logInEmail = data => async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    dispatch({ type: actions.AUTH_START_EMAIL });
    try {
        const res = await firebase.auth().signInWithEmailAndPassword(data.email, data.password);

        dispatch({ type: actions.AUTH_SUCCESS, id: res.user.uid });
    } catch(err) {
        dispatch({ type: actions.AUTH_FAIL, payload: err.message });
    }
}

export const logInGoogle = data => async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    
    dispatch({ type: actions.AUTH_START_GOOGLE })
    try {
        const res = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
        const userDoc = await firestore.collection(USER_COLLECTION).doc(res.user.uid).get();

        if (!userDoc.exists) {
            
            await firestore.collection(USER_COLLECTION).doc(res.user.uid).set({ 
                id: res.user.uid,
                firstName: res.additionalUserInfo.profile.given_name,
                lastName: res.additionalUserInfo.profile.family_name,
                username: res.user.email.split("@")[0],
                email: res.user.email,
                friends: [],
                friendRequests: [],
            });

        } else {
            console.log("user already exists");
        }
        dispatch({ type: actions.AUTH_SUCCESS, id: res.user.uid })
    } catch(err) {
        dispatch({ type: actions.AUTH_FAIL, payload: err.message })
    }
}

// Clean up error messages action
export const clean = () => ({
    type: actions.CLEAN_UP,
})

// Send recover password action
export const recoverPassword = data => async (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    dispatch({type: actions.RECOVERY_START});
    try{
        await firebase.auth().sendPasswordResetEmail(data.email);
        dispatch({type: actions.RECOVERY_SUCCESS});

    } catch(err) {
        dispatch({type: actions.RECOVERY_FAIL, payload: err.message});
    }
}

// Verify email action
export const verifyEmail = () => async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase()
    dispatch({ type: actions.VERIFY_START })
    try {
        const user = firebase.auth().currentUser
        await user.sendEmailVerification()
        dispatch({ type: actions.VERIFY_SUCCESS }) 

    } catch(err) {
        dispatch({ type: actions.VERIFY_FAIL, payload: err.message })
    }
}
