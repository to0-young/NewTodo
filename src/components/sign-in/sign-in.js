import React from 'react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useTheme } from '@mui/material/styles';

import "./sign-in.css"

function SignIn(props) {
  const theme = useTheme();
  console.log(theme.palette)
  return (
    <div className="sign-in">
      <form className="sign-in__form">
        <h2>Sign in</h2>
        <TextField className="sign-in__email"  id="standard-basic" type="Email" label="Email" variant="standard" fullWidth />
        <label htmlFor="email"></label><br/>
        <TextField className="sign-in__password"  id="standard-basic" type="password" label="Password" variant="standard" fullWidth />
        <label htmlFor="password"></label><br/>
        <br/>
        <Button variant="contained" color="info">Sign in</Button>
      </form>
    </div>
  );
}

export default SignIn;