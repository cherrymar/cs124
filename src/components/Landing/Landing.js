import React from 'react'

import LogInForm from '../LogIn/LogInForm';
import SignUpLink from '../SignUp/SignUpLink';


import logo from '../../images/logo.png'


export default function Landing() {

    return (
        <>
            <div className="landing">
                <div className = "regular-logo-container">
                    <img className="main-logo" src = {logo} alt="Logo" />
                </div>

                <h1> Join the Tasks! </h1>
                    <LogInForm />

                <div className="link-area">
                    <SignUpLink />
                </div>
            </div>
        </>
    )
}