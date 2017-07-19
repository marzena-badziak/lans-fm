import React, { Component } from "react";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import "./App.css";
import Home from "./Home";
import Layout from "./Layout";
import ArtistsGrid from "./artists/ArtistsGrid";
import Login from "./session/Login";
import AlbumsPage from "./albums/AlbumsPage";
import AlbumPage from "./albums/AlbumPage";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={hashHistory}>
          <Route path="/">
            <IndexRoute component={Home} />
            <Route component={Layout}>
              <Route path="searchResults" component={ArtistsGrid} />
              <Route path="login" component={Login} />
              <Route path=":artistName/albums" component={AlbumsPage} />
              <Route
                path=":artistName/albums/:albumName"
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
