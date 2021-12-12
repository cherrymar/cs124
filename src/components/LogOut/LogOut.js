

import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import * as actions from '../../backend/store/actions'

import Button from '../Misc/Button'

const LogOut = ({ logout, appCleanUp }) => {
    useEffect(() => {
      // logout();
      appCleanUp()
    }, [logout])

    function handleLogout() {
      appCleanUp();
      logout();
    }

    
    return (
      <>
          <Button onClick={() => handleLogout()}>Log Out</Button>
      </>  

    )
}

const mapDispatchToProps = {
  logout: actions.logOut,
  appCleanUp: actions.appCleanUp,
}

export default connect(null, mapDispatchToProps)(LogOut)