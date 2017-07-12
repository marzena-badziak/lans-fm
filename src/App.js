import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import store from "./user-interface/store";
import Home from "./Home";
import Layout from "./Layout";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={hashHistory}>
          <Route path="/" component={Layout}>
            <Layout>
              <IndexRoute component={Home} />
            </Layout>
          </Route>
        </Router>
      </div>
    );
  }
}

export default App;
