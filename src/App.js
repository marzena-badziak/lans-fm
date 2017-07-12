import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={hashHistory} />{" "}
      </div>
    );
  }
}

export default App;
