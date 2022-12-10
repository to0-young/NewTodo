import logo from './logo.svg';
import {BrowserRouter as Router, Switch, Route,} from "react-router-dom";
import SignUp from "./components/sign-up/sign-up"
import './App.css'
import SignIn from "./components/sign-in/sign-in";
import React from "react";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <SignIn/>
        </Route>

        <Route path="/sign_up">
          <SignUp/>
        </Route>

      </Switch>
    </Router>
  )


  // <SignIn/>;
  // <SignUp/>;
}

export default App;


