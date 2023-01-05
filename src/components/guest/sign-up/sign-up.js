import React from 'react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./sign-up.css"
import {Link} from "react-router-dom";

function SignUp(props) {
  const [user, changeUser] = React.useState({
    firstName: "igor",
    lastName: "franklyn",
    email: "user1@example.com",
    password: "12345"
  })

  const [error, changeError] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  })

  const onValidate = () => {
    let valid = true
    const newError = {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    }
    if (user.firstName.length < 3) {
      valid = false
      newError.firstName = "Sorry your first name is too short"
    }

    if (user.lastName.length < 3) {
      valid = false
      newError.lastName = "Sorry your last name is too short"
    }

    if (user.email.length < 8) {
      valid = false
      newError.email = "Sorry your email is too short"
    }

    if (user.password.length < 1) {
      valid = false
      newError.password = "Sorry your password is too short"
    }

    if (!valid) {
      changeError(newError)
    }
    return valid
  }

  const onSignUp = async (e) => {
    e.preventDefault();
    if (onValidate()) {
      await createUser()
    }
  }

  const onChangeFirstName = (e) => {
    const newFirst = Object.assign({}, user, {firstName: e.target.value})
    changeUser(newFirst)
  }
  const onChangeLastName = (e) => {
    changeUser({
      ... user,
      lastName: e.target.value
    })
  }
  const onChangeEmail = (e) => {
    changeUser({
      ...user,
      email: e.target.value
    })
  }
  const onChangePassword = (e) => {
    changeUser({
      ...user,
      password: e.target.value
    })
  }

  const createUser = async () => {
    const res = await fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        password: user.password
      })
    })
    const json = await res.json()

    if (res.ok) {
      // TODO redirect login page
    } else {
      if (json.errors) {
        const firstError = json.errors.first_name[0],
              lastError = json.errors.last_name[0],
              emailError = json.errors.email[0],
              passwordError = json.errors.password[0]
        changeError({
          firstName: firstError,
          lastName: lastError,
          password: passwordError,
          email: emailError
        })
      }
    }
    return json
  }

  return (
    <div className="sign-up">
      <form onSubmit={onSignUp} className="sign-up__form">
        <h2>Sign up</h2>

        <TextField
          helperText={error.firstName}
          error={"" !== error.firstName}
          value={user.firstName}
          onChange={onChangeFirstName}
          className="sign-up__first-name"
          id="standard-basic"
          label="First name"
          variant="standard"
          fullWidth
        />

        <br/>

        <TextField
          helperText={error.lastName}
          error={"" !== error.lastName}
          value={user.lastName}
          onChange={onChangeLastName}
          className="sign-up__last-name"
          id="standard-basic"
          label="Last name"
          variant="standard"
          fullWidth
        />

        <br/>

        <TextField
          helperText={error.email}
          error={"" !== error.email}
          value={user.email}
          onChange={onChangeEmail}
          className="sign-up__email"
          id="standard-basic"
          type="email"
          label="Email"
          variant="standard"
          fullWidth
        />

        <br/>

        <TextField
          helperText={error.password}
          error={"" !== error.password}
          value={user.password}
          onChange={onChangePassword}
          className="sign-up__password"
          id="standard-basic"
          type="password"
          label="Password"
          variant="standard"
          fullWidth
        />

        <br/>

        <p className="sign-up__advice">
          Already have an account, then <Link to="/">log in</Link></p>
        <br/>

        <Button type={'submit'} variant="contained">create</Button>

        <br/>

      </form>
    </div>
  );
}

export default SignUp;
