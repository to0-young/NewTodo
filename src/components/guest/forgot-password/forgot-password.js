import React from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import './forgot-password.css'
import { Link, useHistory } from 'react-router-dom'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import { connect } from 'react-redux'
import actionCreator from '../../../services/store/action-creator'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

function ForgotPassword(props) {
  const history = useHistory()

  const [user, changeUser] = React.useState({
    email: '',
  })

  const [error, changeError] = React.useState({
    email: '',
  })
  const [errorMsg, setErrorMsg] = React.useState()

  const onValidate = () => {
    let valid = true
    const appError = {
      email: '',
    }
    if (user.email.length < 16) {
      valid = false
      appError.email = 'Sorry your email is too short'
    }
    if (!valid) {
      changeError(appError)
    }
    return valid
  }
  const onForgot = async (e) => {
    e.preventDefault()
    if (onValidate()) {
      await onForget()
    }
  }
  const onChangeEmail = (e) => {
    changeUser({
      ...user,
      email: e.target.value,
    })
  }

  const onForget = async () => {
    const res = await fetch('http://localhost:3000/api/v1/forget_passwords', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: user.email,
      }),
    })

    const json = await res.json()
    if (res.ok) {
      props.getSessionSuccess(json)
      history.push('/forgot_email')
    } else {
      setErrorMsg(json.message)
    }
    return json
  }

  return (
    <div className='forgot-password'>
      <form onSubmit={onForgot} className='forgot-password__form'>
        <LockOutlinedIcon></LockOutlinedIcon>

        <h2>Trouble logging in?</h2>
        <div>Enter your email,and we'll send you a link to get back into your account. </div>

        <br />

        <TextField
          helperText={error.email}
          error={'' !== error.email}
          value={user.email}
          onChange={onChangeEmail}
          className='forgot-email'
          id='standard-basic'
          type='Email'
          label='Email'
          variant='outlined'
          fullWidth
        />

        <br />

        {errorMsg ? (
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity='error'>{errorMsg}</Alert>
          </Stack>
        ) : null}
        <br />

        <Button type={'submit'} variant='contained' color='info'>
          send login link
        </Button>

        <br />
        <br />

        <Link className='forgot-password__account' to='/sign_up'>
          Link create new account
        </Link>

        <br />

        <Link className='forgot-password__back' to='/login'>
          Back to login
        </Link>

        <br />
      </form>
    </div>
  )
}

const ConnectedForgotPassword = connect(null, actionCreator)(ForgotPassword)
export default ConnectedForgotPassword
