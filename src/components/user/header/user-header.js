import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import './user-header.css'
import Button from '@mui/material/Button'
import { connect, useSelector } from 'react-redux'
import actionCreator from '../../../services/store/action-creator'
import { apiUrl } from '../../../exp-const/constants'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Chat } from '../chat/chat'

function UserHeader(props) {
  const history = useHistory()
  const session = useSelector((state) => state.session.details)

  const [anchorEl, setAnchorEl] = React.useState()
  const open = Boolean(anchorEl)

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  console.log()
  const onLogOut = async () => {
    const res = await fetch(`${apiUrl}/api/v1/sessions`, {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })
    const json = await res.json()
    if (res.ok) {
      props.deleteSessionSuccess()
      history.push('/login')
      console.log(session.user.avatar.url)
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
              New task
            </Link>
          </div>
          <div className='header__item header__button'>
            <Link className='Chat_link' to='/chat'>
              Chat
            </Link>
          </div>
        </div>

        <Button
          id='basic-button'
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <img className='header__section_right' src={session.user.avatar.url} />
        </Button>

        <Menu
          id='basic-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={onLogOut}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  )
}

const ConnectedUserHeader = connect(null, actionCreator)(UserHeader)
export default ConnectedUserHeader
