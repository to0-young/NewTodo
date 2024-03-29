import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Dashboard from '../../../components/user/dashboard/dashboard'
import UserHeader from '../../../components/user/header/user-header'
import './user-routes.css'
import NewTask from '../../../components/user/new-task/new-task'
import EditTask from '../../../components/user/edit-task/edit-task'
import Chat from '../../../components/user/chat/chat'

const UserRoutes = () => {
  return (
    <div className='user-routes'>
      <UserHeader />

      <Switch>
        <Route path='/dashboard'>
          <Dashboard />
        </Route>

        <Route path='/tasks/new'>
          <NewTask />
        </Route>

        <Route path='/tasks/:id'>
          <EditTask />
        </Route>

        <Route path='/chat'>
          <Chat />
        </Route>

        <Redirect to='/dashboard' />
      </Switch>
    </div>
  )
}

export default UserRoutes
