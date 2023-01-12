import {BrowserRouter as Router } from "react-router-dom";
import './App.css'
import React, {useEffect} from "react";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/700.css';
import UserRoutes from "./services/routing/user-routes";
import GuestRoutes from "./services/routing/guest-routes";
import { useSelector } from 'react-redux'
import  Spinner from  "./components/reusable/spinner"
import { connect } from "react-redux";
import actionCreator from "./services/store/action-creator";

function App(props) {
  const session = useSelector((state) => state.session.details)
  const fetched = props.fetched

  useEffect(() => {
    fetchSession()
  }, [])

  const fetchSession = async () => {
    const getSessions = await fetch('http://localhost:3000/api/v1/sessions', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
    })

    const json = await getSessions.json()
    if (getSessions.status === 401) return props.getSessionError()
    props.getSessionSuccess(json)
  }

  const isGuest = !session

  if (fetched === false) return <Spinner />

  return (
      <Router>
        {isGuest ? <GuestRoutes/> : <UserRoutes/>}
      </Router>
    )
}

const mapState = (state) => ({ fetched: state.session.fetched })
const ConnectedApp = connect(mapState, actionCreator)(App);
export default ConnectedApp


