import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'

// Reducers we made
import authReducer from './authReducer.js'
import uiReducer from './uiReducer.js'
import appReducer from './appReducer';


export default combineReducers({
    auth: authReducer,
    ui: uiReducer,
    app: appReducer,
    firebase: firebaseReducer,
})