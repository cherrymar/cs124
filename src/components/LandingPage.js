import React, {useState} from 'react';
import styled from 'styled-components';


import OurButton from './OurButton';




export default function LandingPage(props) {




    return (
        <>
            <div className="landing-header">Log in to Tasks</div>
            <input type="text" placeholder="Email"/>
            <input type="password" placeholder="Password"/>
            <OurButton>Log in with email</OurButton>

            <OurButton>Login with Google</OurButton>

            <OurButton>Register</OurButton>





        </>

    )
}