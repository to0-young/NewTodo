import React from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import './new-password.css'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import actionCreator from '../../../services/store/action-creator'

function NewPassword() {
  const history = useHistory()

  const [user, changeUser] = React.useState({
    password: '',
    confirmationPassword: '',
  })

  const [error, changeError] = React.useState({
    password: '',
    confirmationPassword: '',
  })

  const onValidate = () => {
    let valid = true
    const setError = {
      password: '',
      confirmationPassword: '',
    }

    if (user.password.length < 6 || user.password !== user.confirmationPassword) {
      valid = false
      setError.password = 'Sorry your password is too short'
      setError.confirmationPassword = 'Sorry your password confirm is too short'
    }

    if (!valid) {
      changeError(setError)
    }
    return valid
  }

  const onForgot = async (e) => {
    e.preventDefault()
    if (onValidate()) {
      await updateNewPassword()
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

  const updateNewPassword = async () => {
    const searchParams = new URLSearchParams(history.location.search)
    const recoveryToken = Object.fromEntries(searchParams).recovery_token
    const res = await fetch(`http://localhost:3000/api/v1/users`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', Authorization: recoveryToken },
      body: JSON.stringify({
        password: user.password,
        password_confirmation: user.confirmationPassword,
      }),
    })

    const json = await res.json()
    if (res.ok) {
      alert('Your password has been successfully changed')
      history.push('/login')
      return json
    }
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
          className='forgot-new__password'
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

        <Button type={'submit'} variant='contained' onClick={onForgot} color='info'>
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
