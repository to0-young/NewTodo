import React, {useCallback,  useMemo} from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import './sign-up.css'
import { Link, useHistory } from 'react-router-dom'
import { apiUrl } from '../../../exp-const/constants'
import Spinner from '../../reusable/spinner'
import IconButton from '@mui/material/IconButton'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import Stack from '@mui/material/Stack'
import {createUser} from '../../reusable/apiRequests'

function SignUp() {
  const history = useHistory()
  const [file, setFile] = React.useState()
  const [disabled, setDisabled] = React.useState(false)
  const [fetched, setFetched] = React.useState(false)

  const [user, changeUser] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  const [error, changeError] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  const onValidate = useMemo(() => {
    return () => {
      let valid = true
      const newError = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      }
      if (user.firstName.length < 3 || user.firstName.length > 15) {
        valid = false
        newError.firstName = 'Your first name should be between 3 and 15 characters'
      }

      if (user.lastName.length < 3 || user.lastName.length > 15) {
        valid = false
        newError.lastName = 'Your last name should be between 3 and 15 characters'
      }

      if (user.email.length < 8 || user.email.length > 30) {
        valid = false
        newError.email = 'Your email should be between 8 and 30 characters'
      }

      if (user.password.length < 1) {
        valid = false
        newError.password = 'Sorry your password is too short'
      }

      if (!valid) {
        changeError(newError)
      }
      return valid
    }
  }, [user])


  const onSignUp = useCallback(async (e) => {
    e.preventDefault()
    if (onValidate()) {
      await onCreateUser()
    }
  },[onValidate])

  const onChangeFirstName = useCallback((e) => {
    changeUser({
      ...user,
      firstName: e.target.value
    })
  },[user])

  const onChangeLastName = useCallback((e) => {
    changeUser({
      ...user,
      lastName: e.target.value
    })
  },[user])

  const onChangeEmail = useCallback((e) => {
    changeUser({
      ...user,
      email: e.target.value
    })
  },[user])

  const onChangePassword = useCallback((e) => {
    changeUser({
      ...user,
      password: e.target.value
    })
  },[user])

  const handleFile = (e) => {
    setFile(e.target.files[0])
  }

  const onCreateUser = async () => {
    await createUser(apiUrl, user, file, history, setDisabled, setFetched, changeError)
  }

  return (
    <div className='sign-up'>
      <form onSubmit={onSignUp} className='sign-up__form'>
        <h2>Sign up</h2>

        <Stack direction='row' alignItems='center' spacing={2}>
          <IconButton
            color='primary'
            aria-label='upload picture'
            component='label'
          >
            <input
              hidden accept='image/*,.png,.jpg,.gif,.web'
              type='file'
              onChange={handleFile}
            />
            <PhotoCamera />
          </IconButton>
        </Stack>

        <TextField
          helperText={error.firstName}
          error={'' !== error.firstName}
          value={user.firstName}
          onChange={onChangeFirstName}
          className='sign-up__first-name'
          id='standard-basic'
          label='First name'
          variant='standard'
          fullWidth
        />

        <br />

        <TextField
          helperText={error.lastName}
          error={'' !== error.lastName}
          value={user.lastName}
          onChange={onChangeLastName}
          className='sign-up__last-name'
          id='standard-basic'
          label='Last name'
          variant='standard'
          fullWidth
        />

        <br />

        <TextField
          helperText={error.email}
          error={'' !== error.email}
          value={user.email}
          onChange={onChangeEmail}
          className='sign-up__email'
          id='standard-basic'
          type='email'
          label='Email'
          variant='standard'
          fullWidth
        />

        <br />

        <TextField
          helperText={error.password}
          error={'' !== error.password}
          value={user.password}
          onChange={onChangePassword}
          className='sign-up__password'
          id='standard-basic'
          type='password'
          label='Password'
          variant='standard'
          fullWidth
        />

        <br />

        <p className='sign-up__advice'>
          Have an account ?{' '}
          <Link className='sign-in__link' to='/'>
            Log in
          </Link>
        </p>

        <br />

        <Button
          type={'submit'}
          variant='contained'
          disabled={disabled}
          endIcon={fetched ? <Spinner color='success' size='20px' /> : null}
        >
          create
        </Button>

        <br />
      </form>
    </div>
  )
}

export default SignUp
