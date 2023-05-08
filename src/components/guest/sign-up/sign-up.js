import React from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import './sign-up.css'
import { Link, useHistory } from 'react-router-dom'
import { apiUrl } from '../../../exp-const/constants'
import Spinner from '../../reusable/spinner'
import IconButton from '@mui/material/IconButton'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import Stack from '@mui/material/Stack'

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

  const onValidate = () => {
    let valid = true
    const newError = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    }

    if (user.firstName.length < 3) {
      valid = false
      newError.firstName = 'Sorry your first name is too short'
    }

    if (user.lastName.length < 3) {
      valid = false
      newError.lastName = 'Sorry your last name is too short'
    }

    if (user.email.length < 8) {
      valid = false
      newError.email = 'Sorry your email is too short'
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

  const onSignUp = async (e) => {
    e.preventDefault()
    if (onValidate()) {
      await createUser()
    }
  }

  const onChangeFirstName = (e) => {
    const newFirst = Object.assign({}, user, { firstName: e.target.value })
    changeUser(newFirst)
  }

  const onChangeLastName = (e) => {
    changeUser({
      ...user,
      lastName: e.target.value,
    })
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

  const handleFile = (e) => {
    setFile(e.target.files[0])
  }

  const createUser = async () => {
    setDisabled(true)
    setFetched(true)

    const formData = new FormData()
    formData.append('avatar', file)
    formData.append('first_name', user.firstName)
    formData.append('last_name', user.lastName)
    formData.append('password', user.password)
    formData.append('email', user.email)

    const res = await fetch(`${apiUrl}/api/v1/users`, {
      method: 'POST',
      credentials: 'include',
      // headers: {'Content-Type': 'application/json'},
      body: formData,
    })
    const json = await res.json()

    if (res.ok) {
      alert('Please confirm your email registration')
      history.push('/login')
    } else {
      if (json.errors) {
        const firstError = json.errors.first_name === undefined ? '' : json.errors.first_name[0],
          lastError = json.errors.last_name === undefined ? '' : json.errors.last_name[0],
          emailError = json.errors.email === undefined ? '' : json.errors.email[0],
          passwordError = json.errors.password === undefined ? '' : json.errors.password[0]
        changeError({
          firstName: firstError,
          lastName: lastError,
          password: passwordError,
          email: emailError,
        })
      }
      setDisabled(false)
      setFetched(false)
    }
    return json
  }

  return (
    <div className='sign-up'>
      <form onSubmit={onSignUp} className='sign-up__form'>
        <h2>Sign up</h2>

        <Stack direction='row' alignItems='center' spacing={2}>
          <IconButton color='primary' aria-label='upload picture' component='label'>
            <input hidden accept='imege/*,.png,.jpg,.gif,.web' type='file' onChange={handleFile} />
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
          <Link className='sign-in_link' to='/'>
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
