import React from 'react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./sign-in.css"
import {Link} from "react-router-dom";


function SignIn(props) {
  const [user, changeUser] = React.useState( {
    email: "",
    password: ""
  })

  const [error, changeError] = React.useState({
    email: "",
    password: ""
  })

  const onValidate = () => {
    let valid = true
    const appError = {
      email: "",
      password: ""
    }
  if (user.email.length < 8 ) {
    valid = false
    appError.email = "Sorry your email is too short"
  }
  if (user.password.length < 1 ) {
    valid = false
    appError.password = "Sorry your password is too short"
  }
  if(!valid) {
    changeError(appError)
  }
  return valid
  }
  const onSignIn = async (e) => {
    e.preventDefault()
    if (onValidate()) {
      await createUser()
    }
  }
  const onChangeEmail = (e) => {
    const newEmail = Object.assign({},user, {email: e.target.value})
    changeUser(newEmail)
  }
  const onChangePassword = (e) => {
    const newPassword = Object.assign({},user, {password: e.target.value})
    changeUser(newPassword)
  }
  const createUser = async () => {
    const res = await fetch('http://localhost:3000/', {
      method: 'POST',
      body: JSON.stringify({
        email: user.email,
        password: user.password
      })
    })
    const loginUser = await res.json()
    return loginUser
  }

  return (
    <div className="sign-in">
      <form onSubmit={onSignIn} className="sign-in__form">
        <h2>Sign in</h2>
        <TextField
         helperText={error.email}
         error={"" !== error.email}
         value={user.email}
         onChange={onChangeEmail}
         className="sign-in__email"
         id="standard-basic"
         type="Email"
         label="Email"
         variant="standard"
         fullWidth />
         <br/>
        <TextField
          helperText={error.password}
          error={"" !== error.password}
          value={user.password}
          onChange={onChangePassword}
          className="sign-in__password"
          id="standard-basic"
          type="password"
          label="Password"
          variant="standard"
          fullWidth />
        <p className="sign-in__advice">Don`t have an account, then you can <Link to="/sign_up">create one</Link></p>
        <br/>
        <br/>
        <Button variant="contained" color="info">log in</Button>
      </form>
    </div>
  );
}


export default SignIn;