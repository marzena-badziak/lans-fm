import React, { Component } from "react";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import "./App.css";
import Home from "./Home";
import Layout from "./Layout";
import ArtistsGrid from "./artists/ArtistsGrid";
import Login from "./session/Login";
import LoginSpotify from "./session/LoginSpotify";
import AlbumsPage from "./albums/AlbumsPage";
import AlbumPage from "./albums/AlbumPage";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={browserHistory}>
          <Route path="/">
            <IndexRoute component={Home} />
            <Route component={Layout}>
              <Route path="login" component={Login} />
              <Route path="loginSpotify" component={LoginSpotify} />
              <Route path=":artistName" component={ArtistsGrid} />
              <Route path=":artistName/:artistChoosen" component={AlbumsPage} />
              <Route
                path=":artistName/:artistChoosen/:albumName"
                component={AlbumPage}
              />
            </Route>
          </Route>
        </Router>
      </div>
    );
  }
}

export default App;
