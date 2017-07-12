import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
<<<<<<< Updated upstream
<<<<<<< HEAD
import store from './user-interface/store';
=======
>>>>>>> Stashed changes
import SearchBar from "./user-interface/SearchBar";
import ArtistsGrid from "./ArtistsGrid";

class App extends Component {
  render() {
    return (
      <div
        className="App"
        style={{
          backgroundImage:
            "url(" + "http://cdn.wallpapersafari.com/79/66/H3GhW5.jpg" + ")",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed"
        }}
      >
        <SearchBar store={store} />
        <div className="container">
          <ArtistsGrid />
        </div>
      </div>
    );
=======
import Home from "./Home";
class App extends Component {
  render() {
    return <Home />;
>>>>>>> 2477ad8f238097e4be9e96a2c57df643d55ae80f
  }
}

export default App;
