import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import './user-header.css'
import Button from '@mui/material/Button'
import { connect, useSelector } from 'react-redux'
import actionCreator from '../../../services/store/action-creator'
import { apiUrl } from '../../../exp-const/constants'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ClearIcon from '@mui/icons-material/Clear'

function UserHeader(props) {
  const history = useHistory()
  const session = useSelector((state) => state.session.details)
  const [isOpened, setOpened] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState()
  const open = Boolean(anchorEl)

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const ClickMenuBtn = () => {
    setOpened(!isOpened)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLinkClick = () => {
    setOpened(false)
  }

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

  const links = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/tasks/new', label: 'New task' },
    { to: '/chat', label: 'Chat' },
  ]

  return (
    <div className={`header ${isOpened ? 'header-opened' : ''}`}>
      <div className='header__section'>
        <div className='header__section_left'>
          <h2 className='todo__logo'>TODO</h2>
          {links.map((l) => (
            <div key={l.to} className='header__item header__button'>
              <Link className='header__link' to={l.to} onClick={handleLinkClick}>
                {l.label}
              </Link>
            </div>
          ))}
        </div>
        <div className='header__img'>
          <Button
            id='basic-button'
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <img className='header__section_right' src={session.user.avatar.url} />
          </Button>
        </div>

        <IconButton
          size='large'
          edge='start'
          color='inherit'
          aria-label='menu'
          className={'mobile-icon-button'}
          onClick={ClickMenuBtn}
        >
          {isOpened ? <ClearIcon /> : <MenuIcon />}
        </IconButton>

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

      <div className={`header__mobile-items ${isOpened ? 'header__mobile-items_opened' : ''}`}>
        {links.map((l) => (
          <div key={l.to} className='header__mobile-item'>
            <Link className='header__link' to={l.to} onClick={handleLinkClick}>
              {l.label}
            </Link>
          </div>
        ))}

        <div className='header__mobile-item-log' onClick={onLogOut}>
          Logout
        </div>
      </div>
    </div>
  )
}

const ConnectedUserHeader = connect(null, actionCreator)(UserHeader)
export default ConnectedUserHeader
