import React  from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import './sign-in.css'
import { Link, useHistory } from 'react-router-dom'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import { connect } from 'react-redux'
import actionCreator from '../../../services/store/action-creator'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from "jwt-decode"
import {loginUser, loginWithGoogle} from '../../reusable/apiRequests'
function SignIn(props) {
  const history = useHistory()
  const [user, changeUser] = React.useState({
    email: '74.boyko@gmail.com',
    password: 'Dior5580',
  })
  const [error, changeError] = React.useState({
    email: '',
    password: '',
  })
  const [errorMsg, setErrorMsg] = React.useState()

  const onValidate = () => {
    let valid = true
    const appError = {
      email: '',
      password: '',
    }
    if (user.email.length < 8) {
      valid = false
      appError.email = 'Sorry your email is too short'
    }
    if (user.password.length < 1) {
      valid = false
      appError.password = 'Sorry your password is too short'
    }
    if (!valid) {
      changeError(appError)
    }
    return valid
  }

  const onSignIn = async (e) => {
    e.preventDefault()
    if (onValidate()) {
      await onLogIn()
    }
  }

  const onChangeEmail = (e) => {
    changeUser({
      ...user,
      email: e.target.value,
    })
  }

  const onChangePassword = (e) => {
    changeUser({
      ...user,
      password: e.target.value,
    })
  }

  const onLogIn = async () => {
    await loginUser(user, props, history, setErrorMsg)
  }

  const handleGoogleLogin = async (data) => {
    await loginWithGoogle(data, props, history, setErrorMsg)
  }

  return (
    <div className='sign-in'>
      <form onSubmit={onSignIn} className='sign-in__form'>
        <h2>Sign in</h2>
        <TextField
          helperText={error.email}
          error={'' !== error.email}
          value={user.email}
          onChange={onChangeEmail}
          className='sign-in__email'
          id='standard-basic'
          type='Email'
          label='Email'
          variant='standard'
          fullWidth
        />
        <br/>
        <TextField
          helperText={error.password}
          error={'' !== error.password}
          value={user.password}
          onChange={onChangePassword}
          className='sign-in__password'
          id='standard-basic'
          type='password'
          label='Password'
          variant='standard'
          fullWidth
        />
        <br/>
        {errorMsg ? (
          <Stack sx={{width: '100%'}} spacing={2}>
            <Alert severity='error'>{errorMsg}</Alert>
          </Stack>
        ) : null}
        <br/>
        <Button type={'submit'} variant='contained' color='info'>
          log in
        </Button>
        <br/>
        <p className='sign-in__advice'>
          Don't have an account ?{' '}
          <Link className='sign-up__link' to='/sign_up'>
            Сreate one
          </Link>
        </p>

        <Link className='sign-in__forgot' to='/passwords/recovery'>
          Forgot password ?
        </Link>

        <div className='sign-in__google'>
          <GoogleLogin // using the button for logging Google
            onSuccess={credentialResponse => {
              const decodedCredentials = jwtDecode(credentialResponse.credential)
              handleGoogleLogin(decodedCredentials)
            }}
            onError={() => {
              console.log('Login Failed')
            }}
          />
        </div>
      </form>
    </div>
  )
}

const ConnectedSignIn = connect(null, actionCreator)(SignIn)
export default ConnectedSignIn
