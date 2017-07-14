import React, { Component } from "react";
// import logo from "./logo.svg";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import "./App.css";
// import store from "./user-interface/store";
import Home from "./Home";
import Layout from "./Layout";
import ArtistsGrid from "./ArtistsGrid";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={hashHistory}>
          <Route path="/">
            <IndexRoute component={Home} />
            <Route component={Layout}>
              <Route path="searchResults" component={ArtistsGrid} />
            </Route>
          </Route>
        </Router>
      </div>
    );
  }
}

export default App;
