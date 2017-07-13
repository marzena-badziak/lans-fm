import React, { Component } from "react";
import SearchBar from "./user-interface/SearchBar";
// import Navbar from "./user-interface/Navbar";
import styled from "styled-components";
// import ArtistsGrid from "./ArtistsGrid";
import store from "./user-interface/store";
class Home extends Component {
  render() {
    return (
      <div
        className="App"
        style={{
          textAlign: "center",
          margin: "0 auto"
        }}
      >
        <StyledLogo href="#">LansFm</StyledLogo>

        <div
          className="container"
          style={{ marginTop: "20vh", height: "70vh" }}
        >
          <StyledH1 htmlFor="search-bar">
            Search the least popular artists
          </StyledH1>
          <SearchBar store={store} />
          {/* <ArtistsGrid /> */}
        </div>
      </div>
    );
  }
}

const StyledLogo = styled.a`
  position: relative;
  top: 22px;
  left: -34vw;
  font-family: Righteous;
  color: black;
  font-size: x-large;

  &:hover {
    color: #333;
    text-decoration: none;
  }
`;
// const StyledMainAppContainer = styled.div`
//   background-image: url("http://cdn.wallpapersafari.com/79/66/H3GhW5.jpg");
//   background-repeat: no-repeat;
//   background-attachment: fixed;
//   background-size: cover;
// `;

const StyledH1 = styled.h1`
  display: inline-block;
  padding: 10px;
`;
export default Home;
