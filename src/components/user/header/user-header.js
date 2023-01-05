import React from 'react';
import { useHistory } from 'react-router-dom'
import './user-header.css'
import Button from "@mui/material/Button";
import {connect} from "react-redux";
import actionCreator from "../../../services/store/action-creator";

function UserHeader(props) {
  const history = useHistory()

  const onLogOut = async () => {
    const res = await fetch('http://localhost:3000/api/v1/sessions', {
      method: 'DELETE',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'},
    })
    const json = await res.json()
    if (res.ok) {
      props.deleteSessionSuccess()
      history.push('/login')
    }
    return json
  }

  return (
    <div className="header">
      <div className="header__section">
        <div className="header__section_left">
          <div className="header__item header__logo">TODO</div>
          <div className="header__item header__button"><a href="#">Dashboard</a></div>
        </div>

        <div className="header__section_right">
          <Button onClick={onLogOut} variant="contained" color="info">logOut</Button>
        </div>
      </div>
    </div>
  );
}
const ConnectedUserHeader = connect(null, actionCreator)(UserHeader);
export default ConnectedUserHeader;
