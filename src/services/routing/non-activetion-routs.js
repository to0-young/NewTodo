import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import ConfirmEmail from '../../components/user/confirm-email/confirm-email'

function setRouts() {
  return (
    <switch>
      <Route path='/confirm_email'>
        <ConfirmEmail />
      </Route>

      <Redirect to='/login' />
    </switch>
  )
}

export default setRouts
