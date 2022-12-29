import React from 'react'
import {Redirect, Route} from "react-router-dom";
import Dashboard from "../../components/user/dashboard/dashboard";

const UserRoutes = () => {
  return (
    <>
      <Route path="/dashboard">
        <Dashboard />
      </Route>

      <Redirect to="/dashboard"/>
    </>
  )
}
export default UserRoutes