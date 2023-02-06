import React from 'react'
import { Route, Switch } from 'react-router-dom'
import SignIn from '../../components/guest/sign-in/sign-in'
import SignUp from '../../components/guest/sign-up/sign-up'
import { Redirect } from 'react-router-dom'
import ForgotPassword from '../../components/guest/forgot-password/forgot-password'
import NewPassword from '../../components/guest/./new_password/new-password'

const GuestRoutes = () => {
  return (
    <Switch>
      <Route exact path='/login'>
        <SignIn />
      </Route>

      <Route path='/sign_up'>
        <SignUp />
      </Route>

      <Route path='/passwords/recovery'>
        <ForgotPassword />
      </Route>

      <Route path='/passwords/new'>
        <NewPassword />
      </Route>

      <Redirect to='/login' />
    </Switch>
  )
}
export default GuestRoutes
