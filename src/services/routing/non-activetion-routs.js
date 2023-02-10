import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import ConfirmEmail from '../../components/user/confirm-email/confirm-email'
import ActivationRoutes from './activation-routes/activation-routes'

const NonActivationRoutes = () => {
  return (
    <Switch>
      <Route path='/confirm_email'>
        <ConfirmEmail />
      </Route>

      <Route>
        <ActivationRoutes path='/' />
      </Route>

      <Redirect to='/' />
    </Switch>
  )
}

export default NonActivationRoutes
