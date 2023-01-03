import React from 'react'
import {Redirect, Route, Switch} from "react-router-dom";
import Dashboard from "../../components/user/dashboard/dashboard";
import UserHeader from "../../components/user/header/user-header"
import newHeader from "../../components/user/header/user-header.css"

const UserRoutes = () => {
  return (
    <div>
        <UserHeader />
        <Switch>
          <Route path="#">
            <Dashboard/>
          </Route>

          <Redirect to="#"/>
        </Switch>
    </div>
  )
}

export default UserRoutes
