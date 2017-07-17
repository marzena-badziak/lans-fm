import React, { Component } from "react";
import SearchBar from "./user-interface/SearchBar";
// import Navbar from "./user-interface/Navbar";
import styled from "styled-components";
// import ArtistsGrid from "./ArtistsGrid";
//import store from "./user-interface/store";
// import ArtistsGrid from "./ArtistsGrid";
class Home extends Component {
  render() {
    return (
      <StyledHome className="App">
        <StyledLogo href="#">LansFm</StyledLogo>

        <div
          className="container"
          style={{
            paddingTop: "20vh",
            height: "95vh"
          }}
        >
          <StyledH1 htmlFor="search-bar">
            Search the least popular artists
          </StyledH1>
          <StyledH3>
            Type your favourite artist and discover similar ones!
          </StyledH3>
          <SearchBar
            boxShadow="0px 0px 30px 3px rgba(0, 0, 0, 0.6);"
            width="100%"
            height="50px"
          />
          {/* <ArtistsGrid /> */}
        </div>
      </StyledHome>
    );
  }
}
const StyledHome = styled.div`
  text-align: center;
  margin: 0 auto;
  background: url('https://files.slack.com/files-pri/T5X6DE6HX-F68Q4HP3M/background.png')
    no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
`;
const StyledLogo = styled.a`
  position: relative;
  top: 22px;
  left: -34vw;
  font-family: Righteous;
  color: white;
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
  color: white;
  font-weight: 700;
  padding: 5px;
  margin: 10px;
`;
const StyledH3 = styled.h3`
  display: inline-block;
  color: white;
  font-weight: 700;
  padding: 5px;
  margin: 5px;
`;

export default Home;
