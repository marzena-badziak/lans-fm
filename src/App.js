import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
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
        <SearchBar />
        <div className="container">
          <ArtistsGrid />
        </div>
      </div>
    );
  }
}

export default App;
