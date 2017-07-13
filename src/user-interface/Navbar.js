import React, { Component } from "react";
import SearchBar from "./SearchBar";
import styled from "styled-components";
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';


class Navbar extends Component {
  render() {
    return (
      <AppBar style={{backgroundColor: "#01579B"}} title = {<StyledLogo href="/">LansFm</StyledLogo>} iconElementRight={<FlatButton label="Login" />} showMenuIconButton={false}/>



/*
        <div>
          <StyledLogo href="#">LansFm</StyledLogo>
        </div>
        <SearchBar width="40%" />
        <div>
          <StyledLink href="#">Login</StyledLink>
        </div>
      </AppBar>
      */
    );
  }
}
const StyledLink = styled.a`
  color: white;

  &:hover {
    color: #e7f7ff;
    text-decoration: none;
  }
`;
const StyledLogo = styled.a`
  font-family: Righteous;
  color: white;
  font-size: x-large;

  &:hover {
    color:#e7f7ff;
    text-decoration: none;
  }
`;
const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.45);
  border: none;
  align-items: center;
`;
export default Navbar;
