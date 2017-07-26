import React, { Component } from "react";
import SearchBar from "./user-interface/SearchBar";
import styled from "styled-components";
import LoginInfo from "./session/LoginInfo";

class Home extends Component {
  render() {
    return (
      <StyledHome className="App">
        <StyledTopBar>
          <StyledLogo href="/">LansFm</StyledLogo>
          <StyledLogin>
            <LoginInfo currentPageParams={this.props.urlParams} />
          </StyledLogin>
        </StyledTopBar>
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
            height="65px"
          />
        </StyledContainer>
      </StyledHome>
    );
  }
}
const StyledHome = styled.div`
  text-align: justify;
  margin: 0 auto;
  background: url('https://files.slack.com/files-pri/T5X6DE6HX-F68Q4HP3M/background.png')
    no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 100vh;
  width: 100vw;
`;
const StyledTopBar = styled.div`
  margin: 0 auto;
  padding: 0;
`;
const StyledLogo = styled.a`
  position: relative;
  top: 22px;
  left: 20px;
  font-family: Righteous;
  font-size: 2.5em;
  color: white;
  text-shadow: 3px 2px 12px rgba(0, 0, 0, 1);

  &:hover {
    color: #333;
    text-decoration: none;
  }
  @media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
    font-size: 2em;
  }

  /* Smartphones (portrait) ----------- */
  @media only screen and (max-width: 320px) {
    font-size: 2em;
  }
`;

const StyledLogin = styled.a`
  position: relative;
  float: right;
  top: 27px;
  right: 5px;
  font-family: Righteous;
  color: white;
  font-size: x-large;
  text-shadow: 3px 2px 12px rgba(0, 0, 0, 1);

  &:hover {
    color: #333;
    text-decoration: none;
  }
  @media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
    right: 2px;
  }

  /* Smartphones (portrait) ----------- */
  @media only screen and (max-width: 320px) {
    right: 0;
  }
`;

const StyledContainer = styled.div`
  padding-top: 15vh;
  text-align: center;
`;

const StyledHeaderMain = styled.h1`
  font-size: 4em;
  display: inline-block;
  color: white;
  font-weight: 700;
  padding: 5px;
  margin: 10px;
  text-shadow: 3px 2px 12px rgba(0, 0, 0, 1);

  /* Smartphones (portrait and landscape) ----------- */
  @media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
    font-size: 3.3em;
  }

  /* Smartphones (portrait) ----------- */
  @media only screen and (max-width: 320px) {
    font-size: 3em;
  }
`;

const StyledHeaderSecondary = styled.h2`
  font-size: 2.2em;
  display: inline-block;
  color: white;
  font-weight: 700;
  padding: 5px;
  margin: 10px;
  margin-bottom: 20px;
  text-shadow: 3px 2px 12px rgba(0, 0, 0, 1);
  /* Smartphones (portrait and landscape) ----------- */
  @media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
    font-size: 2em;
  }

  /* Smartphones (portrait) ----------- */
  @media only screen and (max-width: 320px) {
    font-size: 1.5em;
  }
`;

export default Home;
