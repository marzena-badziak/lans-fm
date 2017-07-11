import React, {
  Component
}
from 'react';
import './App.css';
//import Layout from "./Layout";
//LandingPage - import Home from "./Home";
//import SignUp from "./session/SignUp";
//import Login from "./session/Login";
import {
  Router, Route, IndexRoute, hashHistory
}
from "react-router";



class App extends Component {

  render() {
    return ( < div className = "App" >
      < Router history = {
        hashHistory
      } >
      < Route path = "/"
      component = {
        Layout
      } >
      < /Route> < /Router> < /div>
    );
  }
}

export default App;
