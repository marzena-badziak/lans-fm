import React, { Component } from "react";
import SearchBar from "./user-interface/SearchBar";
import Navbar from "./user-interface/Navbar";
import styled from "styled-components";
import ArtistsGrid from "./ArtistsGrid";
import store from "./user-interface/store";
class Home extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <StyledH1 htmlFor="search-bar">Search Artist</StyledH1>
          <SearchBar store={store} />
          <ArtistsGrid />
        </div>
      </div>
    );
  }
}
/*
const StyledMainAppContainer = styled.div`
  background-image: url("http://cdn.wallpapersafari.com/79/66/H3GhW5.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
`;
*/

const StyledH1 = styled.h1`display: inline-block;`;
export default Home;
