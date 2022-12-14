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
        email: 'opapapa@gmail.com',
      })
    })
    const data = await res.json()
    console.log(data)
  }

  return (
    <div className="sign-in">
      <form className="sign-in__form">
        <h2>Sign in</h2>
        <TextField value={user.email} onChange={onChangeEmail} className="sign-in__email"  id="standard-basic" type="Email" label="Email" variant="standard" fullWidth />
        <label htmlFor="email"></label><br/>
        <TextField alue={user.password} onChange={onChangePassword}className="sign-in__password"  id="standard-basic" type="password" label="Password" variant="standard" fullWidth />
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