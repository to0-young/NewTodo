import React from 'react'
import {Redirect, Route, Switch} from "react-router-dom";
import Dashboard from "../../components/user/dashboard/dashboard";
import UserHeader from "../../components/user/header/user-header"
import './user-routes.css'

const UserRoutes = () => {
  return (
    <div className='user-routes'>
        <UserHeader />

        <Switch>
          <Route path="/dashboard">
            <Dashboard/>
          </Route>

          <Redirect to="/dashboard"/>
        </Switch>
    </div>
  )
}

export default UserRoutes
