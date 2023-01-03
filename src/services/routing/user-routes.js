import React from 'react'
import {Redirect, Route, Switch} from "react-router-dom";
import Dashboard from "../../components/user/dashboard/dashboard";

const UserRoutes = () => {
  return (

      <Switch>
        <Route path="/dashboard">
          <Dashboard />
        </Route>

        <Redirect to="/dashboard"/>
      </Switch>
  )
}

export default UserRoutes