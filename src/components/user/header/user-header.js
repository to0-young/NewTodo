import React from 'react';
import { useHistory } from 'react-router-dom'
import './user-header.css'
import Button from "@mui/material/Button";
import actionTypes from "../../../services/store/action-types";
import {useDispatch} from "react-redux";

function UserHeader(props) {
  const history = useHistory()
  const dispatch = useDispatch()

  // TODO move to action creators
  const deleteSessionSuccess = () => {
    const action = { type: actionTypes.deleteSessionSuccess }
    return dispatch(action)
  }

  const onLogOut = async () => {
    const res = await fetch('http://localhost:3000/api/v1/sessions', {
      method: 'DELETE',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'},
    })

    const json = await res.json()
    if (res.ok) {
      deleteSessionSuccess()
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

export default UserHeader;
