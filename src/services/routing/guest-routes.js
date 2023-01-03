import React from 'react';
import {Route, Switch} from "react-router-dom";
import SignIn from "../../components/guest/sign-in/sign-in";
import SignUp from "../../components/guest/sign-up/sign-up";
import { Redirect } from 'react-router-dom';

const GuestRoutes = () => {
  return (
    <Switch>
      <Route exact path="/login">
        <SignIn/>
      </Route>

      <Route path="/sign_up">
        <SignUp/>
      </Route>

      <Redirect to="login"/>
    </Switch>
  )
}
export default GuestRoutes;
