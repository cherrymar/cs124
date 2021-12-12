import React from 'react';

import LogInLink from '../LogIn/LogInLink';
import SignUpForm from './SignUpForm';

import logo from '../../images/logo.png'

const SignUpPage = () => (
  <div className = "sign-up">

    <div className = "regular-logo-container">
      <img className = "main-logo" src = {logo} alt = "Logo" />
    </div>
    
    <SignUpForm />

    <div className = "link-area">
      <LogInLink />
    </div>

  </div>
)

export default SignUpPage
