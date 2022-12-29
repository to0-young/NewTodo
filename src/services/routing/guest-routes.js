import React from 'react';
import {Route} from "react-router-dom";
import SignIn from "../../components/guest/sign-in/sign-in";
import SignUp from "../../components/guest/sign-up/sign-up";
import { Redirect } from 'react-router-dom';

const GuestRoutes = () => {
  return (
    <>
      <Route exact path="/login">
        <SignIn/>
      </Route>

      <Route path="/sign_up">
        <SignUp/>
      </Route>

      <Redirect to="/login"/>
    </>
  )
}
export default GuestRoutes;
