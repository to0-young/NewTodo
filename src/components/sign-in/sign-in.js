import React from 'react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./sign-in.css"
import {Link} from "react-router-dom";

function SignIn(props) {
  return (
    <div className="sign-in">
      <form className="sign-in__form">
        <h2>Sign in</h2>
        <TextField className="sign-in__email"  id="standard-basic" type="Email" label="Email" variant="standard" fullWidth />
        <label htmlFor="email"></label><br/>
        <TextField className="sign-in__password"  id="standard-basic" type="password" label="Password" variant="standard" fullWidth />
        <label htmlFor="password"></label><br/>
        <p className="sign-in__advice">Don`t have an account, then you can <Link to="/sign_up">create one</Link></p>
        <br/>
        <br/>
        <Button variant="contained" color="info">log in</Button>
      </form>
    </div>
  );
}

export default SignIn;