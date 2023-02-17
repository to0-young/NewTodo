import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import ConfirmEmail from '../../components/user/confirm-email/confirm-email'
import ConfirmAccount from './activation-routes/activation-account'

const NonActivatedRoutes = () => {
  return (
    <Switch>
      <Route path='/confirm_email'>
        <ConfirmEmail />
      </Route>

      <Route>
        <ConfirmAccount path='/' />
      </Route>

      <Redirect to='/' />
    </Switch>
  )
}

export default NonActivatedRoutes
