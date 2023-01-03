import {BrowserRouter as Router, Switch } from "react-router-dom";
import './App.css'
import React, {useEffect} from "react";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/700.css';
import UserRoutes from "./services/routing/user-routes";
import GuestRoutes from "./services/routing/guest-routes";
import {useDispatch} from "react-redux";
import actionTypes from './services/store/actionTypes'
import { useSelector } from 'react-redux'
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

function App(props) {
  const dispatch = useDispatch()
  const session = useSelector((state) => state.session.details)
  const fetched = useSelector((state) => state.session.fetched)

  const getSessionSuccess = payload => {
    const action = { type: actionTypes.getSessionSuccess, payload }
    return dispatch(action)
  }

  const getSessionError = () => {
    const action = { type: actionTypes.getSessionError }
    return dispatch(action)
  }

  useEffect(() => {
    fetchSessions()
  }, [])

  const fetchSessions = async () => {
    const getSessions = await fetch('http://localhost:3000/api/v1/sessions', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
    })

    const json = await getSessions.json()
    if (getSessions.status === 401) return getSessionError()
    getSessionSuccess(json)
  }

  const isGuest = !session

  if (fetched === false) {
    return (
      <Stack sx={{color: 'grey.500', width: '100%'}} spacing={2}>
        {<CircularProgress style={{margin: 'auto'}} color="inherit"/>}
      </Stack>
    )
  }

  return (
      <Router>
        {isGuest ? <GuestRoutes/> : <UserRoutes/>}
      </Router>
    )
}


export default App;




