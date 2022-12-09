import React from 'react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./sign-up.css"

function SignUp(props) {
  return (
    <div className="sign-up">
      <form className="sign-up__form">
        <h2>TodoList</h2>
        <TextField className="sign-up__first-name"  id="standard-basic" label="First name" variant="standard" fullWidth />
        <label htmlFor="Fname"></label><br/>
        <TextField  className="sign-up__last-name" id="standard-basic" label="Last name" variant="standard" fullWidth  />
        <label htmlFor="email"></label><br/>
        <TextField className="sign-up__email" id="standard-basic" type="Email" label="Email" variant="standard"  fullWidth />
        <label htmlFor="email"></label><br/>
        <TextField className="sign-up__password" id="standard-basic" type="password" label="Password" variant="standard" fullWidth />
        <br/>
        <br/>
        <Button variant="contained">sign up</Button>
        <br/>
      </form>
    </div>
  );
}

export default SignUp;