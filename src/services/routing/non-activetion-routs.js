import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import ConfirmEmail from '../../components/user/confirm-email/confirm-email'
import ActivationMessage from './activation-routes/activation-message'

const NonActivatedRoutes = () => {
  return (
    <Switch>
      <Route path='/confirm_email'>
        <ConfirmEmail />
      </Route>

      <Route>
        <ActivationMessage path='/' />
      </Route>

      <Redirect to='/' />
    </Switch>
  )
}

export default NonActivatedRoutes
