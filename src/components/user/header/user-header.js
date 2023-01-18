import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import './user-header.css'
import Button from '@mui/material/Button'
import { connect } from 'react-redux'
import actionCreator from '../../../services/store/action-creator'

function UserHeader(props) {
  const history = useHistory()

  const onLogOut = async () => {
    const res = await fetch('http://localhost:3000/api/v1/sessions', {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })
    const json = await res.json()
    if (res.ok) {
      props.deleteSessionSuccess()
      history.push('/login')
    }
    return json
  }

  return (
    <div className='header'>
      <div className='header__section'>
        <div className='header__section_left'>
          <h2 className='todo_logo'>TODO</h2>
          <div className='header__item header__button'>
            <Link className='Dashboard_link' to='/dashboard'>
              Dashboard
            </Link>
          </div>
          <div className='header__item header__button'>
            <Link className='New-Task_link' to='/tasks/new'>
              New Task
            </Link>
          </div>
        </div>

        <div className='header__section_right'>
          <Button onClick={onLogOut} variant='contained' color='info'>
            logOut
          </Button>
        </div>
      </div>
    </div>
  )
}
const ConnectedUserHeader = connect(null, actionCreator)(UserHeader)
export default ConnectedUserHeader
