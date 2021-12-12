import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import * as ROUTES from './constants/routes'
import { connect } from 'react-redux'
import * as actions from './backend/store/actions'

import Landing from './components/Landing/Landing';
// import SignUp from '../SignUp'
import LogOut from './components/LogOut/LogOut';
// import LogInForm from './components/LogIn/LogInForm';
import SignUpPage from './components/SignUp/SignUpPage';
import TaskPage from './components/Tasks/TaskPage';
// import Home from '../Home'
// import Menu from '../Menu'
// import PasswordRecovery from '../Profile/PasswordRecovery.js'
// import ProfileEdit from '../Profile/ProfileEdit.js'
// import Restaurants from '../Restaurants'
// import About from '../About'
// import Navbar from '../Navigation'
// import Backdrop from '../Navigation/Backdrop.js'
// import Friends from '../Friends/Friend'
// import EmailVerification from '../EmailVerification'
// import AddFriends from '../Friends/AddFriends'
// import EditFriends from '../Friends/EditFriends'
// import PickFood from '../Food/PickFood'

// import '../../stylesheets/Landing.css'
// import '../../stylesheets/SignUp.css'
// import '../../stylesheets/Restaurants.css'
// import '../../stylesheets/Menu.css'
// import '../../stylesheets/Home.css'
// import '../../stylesheets/SearchBar.css'
// import '../../stylesheets/Backdrop.css'
// import '../../stylesheets/DrawerToggleButton.css'
// import '../../stylesheets/CheatingToolbar.css'
// import '../../stylesheets/Loader.css'
// import '../../stylesheets/Navbar.css'
// import '../../stylesheets/Friends.css'
// import '../../stylesheets/EmailVerification.css'
// import '../../stylesheets/ProfileChange.css'
import './stylesheets/main-logo.css';
import './stylesheets/selectSortView.css';
import './stylesheets/tabs.css';

// import '../../stylesheets/titles.css'
// import '../../stylesheets/button.css'
// import '../../stylesheets/form.css'
// import '../../stylesheets/about.css'
// import '../../stylesheets/PasswordChange.css'

const App = ({ getLists, userId, sideDrawer, emailVerified, sortView, filterView }) => {
    
    let routes;
    let backdrop;

    if (sideDrawer) {
        backdrop = <div>backdrop</div> //<Backdrop click = {close}/>
    }

    if (userId && !emailVerified) {
        routes = (
        <>
            <button>Resend email verification</button>
            {/* <Navbar drawerClickHandler = {open}/>
            <Menu show = {sideDrawer} />
            {backdrop} */}
            <Switch> 
                {/* <Route exact path={ROUTES.EMAIL_VERIFICATION} component={EmailVerification} /> */}
                <Route exact path={ROUTES.LOG_OUT} component={LogOut} />
                {/* <Redirect to={ROUTES.EMAIL_VERIFICATION} /> */}
            </Switch>
        </>
        )
    } else if (userId && emailVerified) {
        getLists({sortView: sortView, filterView: filterView});
        routes = (
        <>
            {/* <div>App</div>
           <LogOut/> */}
            {/* <Navbar drawerClickHandler = {open}/>
            <Menu show = {sideDrawer} />
            {backdrop} */}

            <Switch>
                {/* <Route exact path={ROUTES.HOME} component={Home} /> */}
                <Route exact path={ROUTES.TASKS} component={TaskPage} />
                <Route exact path={ROUTES.LOG_OUT} component={LogOut} />
                {/* <Route exact path={ROUTES.MENU} component={Menu} />
                <Route exact path={ROUTES.PASSWORD_RECOVERY} component={PasswordRecovery} />
                <Route exact path={ROUTES.PROFILE_EDIT} component={ProfileEdit} />
                <Route exact path={ROUTES.RESTAURANTS} component={Restaurants} />
                <Route exact path={ROUTES.ABOUT} component={About} />
                <Route exact path={ROUTES.ADD_FRIENDS} component={AddFriends} />
                <Route exact path={ROUTES.EDIT_FRIENDS} component={EditFriends} />
                <Route exact path={ROUTES.PICK_FOOD} component={PickFood} /> */}
                {/* <Redirect to={ROUTES.HOME} /> */}
                {/* <Redirect to={ROUTES.LOG_OUT} /> */}
                <Redirect to={ROUTES.TASKS} />

            </Switch>
        </>
        )
    } else {
        routes = (
        // <>
        //     <div>Login Page</div>
        //     <LogIn></LogIn>
        //     <SignUp></SignUp>
        //     {/* <button><SignUp></SignUp></button> */}
        // </>
        <Switch>
            <Route exact path={ROUTES.LANDING} component={Landing} />
            <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
            {/* <Route exact path={ROUTES.ABOUT} component={About} />
            <Route exact path={ROUTES.PASSWORD_RECOVERY} component={PasswordRecovery} /> */}
            <Redirect to={ROUTES.LANDING} />
        </Switch>
        )
    }

    return  <main> {routes} </main>
}

const mapStateToProps = ({ firebase, app}) => ({
    userId: firebase.auth.uid,
    emailVerified: firebase.auth.emailVerified,
    
    sortView: app.sortView,
    filterView: app.filterView,
})

const mapDispatchToProps = {
    getLists: actions.getLists,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)