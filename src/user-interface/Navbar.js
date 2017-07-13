import React, { Component } from "react";
import SearchBar from "./SearchBar";
import SearchBarTop from "./SearchBarTop";
import styled from "styled-components";

class Navbar extends Component {
  render() {
    return (
      <StyledNav className="navbar navbar-default navbar-fixed-top">
        <div>
          <StyledLogo href="#">LansFm</StyledLogo>
        </div>

        <StyledTopSearchBar width="50%" />

        <div>
          <StyledLink href="#">Login</StyledLink>
        </div>
      </StyledNav>
    );
  }
}

const StyledTopSearchBar = styled(SearchBar)`
  background-color: red;
  font-size: 10px;
`;

const StyledLink = styled.a`
  color: black;
  &:hover {
    color: #333;
    text-decoration: none;
  }
`;
const StyledLogo = styled.a`
  font-family: Righteous;
  color: black;
  font-size: x-large;
  &:hover {
    color: #333;
    text-decoration: none;
  }
`;
const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  background-color: #258dc8;
  border: none;
  align-items: center;
  padding: 15px 5px;
`;
export default Navbar;
