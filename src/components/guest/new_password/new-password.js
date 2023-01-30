import React from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import './new-password.css'
import { Link, useHistory } from 'react-router-dom'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import { connect } from 'react-redux'
import actionCreator from '../../../services/store/action-creator'

function NewPassword(props) {
  const history = useHistory()

  const [user, changeUser] = React.useState({
    password: '',
    confirmationPassword: '',
  })

  const [error, changeError] = React.useState({
    password: '',
    confirmationPassword: '',
  })
  const [errorMsg, setErrorMsg] = React.useState()

  const onValidate = () => {
    let valid = true
    const appError = {
      password: '123',
      confirmationPassword: '',
    }

    if (user.confirmationPassword.length < 8) {
      valid = false
      appError.confirmationPassword = 'Sorry your  new password is too short'
    }
    if (user.password.length < 8) {
      valid = false
      appError.password = 'Sorry your password is too short'
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
  const onChangePassword = (e) => {
    changeUser({
      ...user,
      password: e.target.value,
    })
  }

  const onChangeConfirmationPassword = (e) => {
    changeUser({
      ...user,
      confirmationPassword: e.target.value,
    })
  }

  const onForget = async () => {
    const res = await fetch('http://localhost:3000/api/v1/sessions', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password: '',
        confirmationPassword: '',
      }),
    })

    const json = await res.json()
    if (res.ok) {
      props.getSessionSuccess(json)
      history.push('/forgot')
    } else {
      setErrorMsg(json.message)
    }
    return json
  }

  return (
    <div className='new-password'>
      <form onSubmit={onForgot} className='new-password__form'>
        <h2>New password</h2>

        <TextField
          helperText={error.password}
          error={'' !== error.password}
          value={user.password}
          onChange={onChangePassword}
          className='new-password'
          id='standard-basic'
          type='password'
          label='New Password'
          variant='standard'
          fullWidth
        />

        <br />

        <TextField
          helperText={error.confirmationPassword}
          error={'' !== error.confirmationPassword}
          value={user.confirmationPassword}
          onChange={onChangeConfirmationPassword}
          className='forgot-password__confirmation'
          id='standard-basic'
          type='password'
          label='Password Confirmation'
          variant='standard'
          fullWidth
        />

        <br />

        {errorMsg ? (
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity='error'>{errorMsg}</Alert>
          </Stack>
        ) : null}

        <Button type={'submit'} variant='contained' color='info'>
          save
        </Button>

        <br />
        <br />

        <Link className='new-password__account' to='/sign_up'>
          Create new account ?
        </Link>

        <br />

        <Link className='new-password__back' to='/login'>
          Back to login
        </Link>

        <br />
      </form>
    </div>
  )
}

const ConnectedNewPassword = connect(null, actionCreator)(NewPassword)
export default ConnectedNewPassword
