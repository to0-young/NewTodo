import React from 'react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./sign-up.css"
import {Link} from "react-router-dom";

function SignUp(props) {
  const [first, changeFirst] = React.useState("")

  const onSignUp = (e) => {
    e.preventDefault();
    console.log('hello',first)
  }
  const onChangeFirst = (e) => {
    changeFirst(e.target.value)
}

  return (
    <div className="sign-up">
      <form onSubmit={onSignUp} className="sign-up__form">
        <h2>Sign up</h2>
        <TextField  value={first} onChange={onChangeFirst} className="sign-up__first-name"  id="standard-basic" label="First name" variant="standard" fullWidth />
        <label htmlFor="Fname"></label><br/>
        <TextField  className="sign-up__last-name" id="standard-basic" label="Last name" variant="standard" fullWidth  />
        <label htmlFor="email"></label><br/>
        <TextField className="sign-up__email" id="standard-basic" type="email" label="Email" variant="standard"  fullWidth />
        <label htmlFor="email"></label><br/>
        <TextField className="sign-up__password" id="standard-basic" type="password" label="Password" variant="standard" fullWidth />
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