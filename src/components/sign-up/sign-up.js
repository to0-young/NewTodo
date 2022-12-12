import React from 'react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./sign-up.css"
import {Link} from "react-router-dom";

function SignUp(props) {
  const [user, changeUser] = React.useState({
    firstName: "",
    lastName: "",
    email : "",
    password: ""
  })

  const onSignUp = (e) => {
    e.preventDefault();
  }
  const onChangeFirstName = (e) => {
    const newFirst = Object.assign({},user, {firstName: e.target.value})
    changeUser(newFirst)
  }
  console.log()
  const onChangeLastName = (e) => {
    const newLast = Object.assign({},user, {lastName: e.target.value})
    changeUser(newLast)
  }
  const onChangeEmail = (e) => {
    changeUser( {
      ...user,
      email: e.target.value
    })
  }
  const onChangePassword = (e) => {
    changeUser( {
      ...user,
      password: e.target.value
    })
  }
  return (
    <div className="sign-up">
      <form onSubmit={onSignUp} className="sign-up__form">
        <h2>Sign up</h2>
        <TextField  value={user.firstName} onChange={onChangeFirstName} className="sign-up__first-name"  id="standard-basic" label="First name" variant="standard" fullWidth />
        <label htmlFor="fName"></label><br/>
        <TextField value={user.lastName} onChange={onChangeLastName} className="sign-up__last-name" id="standard-basic" label="Last name" variant="standard" fullWidth  />
        <label htmlFor="lName"></label><br/>
        <TextField  value={user.email} onChange={onChangeEmail} className="sign-up__email" id="standard-basic" type="email" label="Email" variant="standard"  fullWidth />
        <label htmlFor="email"></label><br/>
        <TextField value={user.password} onChange={onChangePassword} className="sign-up__password" id="standard-basic" type="password" label="Password" variant="standard" fullWidth />
        <br/>
        <p className="sign-up__advice">Already have an account, then <Link to="/">log in</Link></p>
        <br/>
        <br/>
        <Button type={'submit'}  variant="contained">create</Button>
        <br/>
      </form>
    </div>
  );
}


export default SignUp;

