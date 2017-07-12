import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import Home from "./Home";

class App extends Component {
  render() {
    return <Home />;
  }
}

export default App;
