import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import './user-header.css'
import Button from '@mui/material/Button'
import { connect, useSelector } from 'react-redux'
import actionCreator from '../../../services/store/action-creator'
import { apiUrl } from '../../../exp-const/constants'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Spinner from '../../reusable/spinner'

function UserHeader(props) {
  const history = useHistory()
  const fetched = useSelector((state) => state.task.fetched)

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
    }
    return json
  }

  if (fetched === false) return <Spinner />

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
        </div>

        <Button
          id='basic-button'
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <img
            className='header__section_right'
            src='https://todo-backet.fra1.digitaloceanspaces.com/uploads/user/avatar/145/img-5322-2-jpg-1-1600x1600.jpg?X-Amz-Expires=600&X-Amz-Date=20230315T183233Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=DO00HA36CVQL3Z32M8XT%2F20230315%2Ffra1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=5ea4fedb6d3e8b58c80b21175f727a9dbccfe4949257557f62ecd285c2e543b2'
          />
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
          <MenuItem onClick={onLogOut}>Profile</MenuItem>
          <MenuItem onClick={onLogOut}>Notifications</MenuItem>
          <MenuItem onClick={onLogOut}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  )
}
const ConnectedUserHeader = connect(null, actionCreator)(UserHeader)
export default ConnectedUserHeader
