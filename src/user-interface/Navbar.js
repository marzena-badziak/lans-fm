import React, { Component } from "react";
import SearchBar from "./SearchBar";
import styled from "styled-components";
import store from "./store";

class Navbar extends Component {
  render() {
    return (
      <StyledNav className="navbar navbar-default">
        <div>
          <StyledLogo href="#">Lans-Fm</StyledLogo>
        </div>
        <SearchBar store={store} width="40%" />
        <div>
          <StyledLink href="#">Login</StyledLink>
        </div>
      </StyledNav>
    );
  }
}
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
  background-color: rgba(255, 255, 255, 0.45);
  border: none;
  align-items: center;
`;
export default Navbar;
