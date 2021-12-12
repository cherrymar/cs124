import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'

// Reducers we made
import authReducer from './authReducer.js'
import appReducer from './appReducer';


export default combineReducers({
    auth: authReducer,
    app: appReducer,
    firebase: firebaseReducer,
})