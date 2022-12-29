import {BrowserRouter as Router, Switch, Redirect} from "react-router-dom";
import './App.css'
import React, {useEffect} from "react";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/700.css';
import UserRoutes from "./services/routing/user-routes";
import GuestRoutes from "./services/routing/guest-routes";
import {useDispatch, useSelector} from "react-redux";

function App(props) {
  const dispatch = useDispatch()
  const item = useSelector(state => state)

  const addDIS = (item,index) => {
    item({
      type: "GET_SESSION",
      payload: ""
    })
  }

  useEffect(() => {
    console.log(item)
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
    fetchSessions()
    return json
  }

  const isGuest = true
  return (
    <Router>
      <Switch>
        {isGuest ? <GuestRoutes/> : <UserRoutes/>}
      </Switch>
    </Router>
  )
}

export default App;



