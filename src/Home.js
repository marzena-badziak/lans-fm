import React, { Component } from "react";
import SearchBar from "./user-interface/SearchBar";
import styled from "styled-components";
class Home extends Component {
  render() {
    return (
      <StyledHome className="App">
        <StyledLogo href="#">LansFm</StyledLogo>

        <StyledContainer className="container">
          <StyledHeaderMain htmlFor="search-bar">
            Search the least popular artists
          </StyledHeaderMain>
          <StyledHeaderSecondary>
            Type your favourite artist and discover similar ones!
          </StyledHeaderSecondary>
          <SearchBar
            boxShadow="0px 0px 30px 3px rgba(0, 0, 0, 0.6);"
            width="80%"
            height="60px"
          />
        </StyledContainer>
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
  height: 100vh;
`;
const StyledLogo = styled.a`
  position: relative;
  top: 22px;
  left: -34vw;
  font-family: Righteous;
  color: white;
  font-size: x-large;
  text-shadow: 3px 2px 12px rgba(0, 0, 0, 1);

  &:hover {
    color: #333;
    text-decoration: none;
  }
`;

const StyledContainer = styled.div`padding-top: 20vh;`;

const StyledHeaderMain = styled.h1`
  display: inline-block;
  color: white;
  font-weight: 700;
  padding: 5px;
  margin: 10px;
  font-size: 48px;
  text-shadow: 3px 2px 12px rgba(0, 0, 0, 1);
`;
const StyledHeaderSecondary = styled.h2`
  display: inline-block;
  color: white;
  font-weight: 700;
  padding: 5px;
  margin: 5px;
  text-shadow: 3px 2px 12px rgba(0, 0, 0, 1);
`;

export default Home;
