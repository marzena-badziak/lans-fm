import React, { Component } from "react";
import SearchBar from "./SearchBar";
import styled from "styled-components";

class Navbar extends Component {
  render() {
    return (
      <StyledNav className="navbar navbar-default">
        <div className="navbar-header">
          <StyledLogo className="navbar-brand" href="#">
            Lans-Fm
          </StyledLogo>
        </div>
        <SearchBar width="40%" />
        <div style={{ marginTop: "15px" }}>
          <a href="#">Login</a>
        </div>
      </StyledNav>
    );
  }
}
const StyledLogo = styled.a`
  font-family: Righteous;
  color: black;
`;
const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
`;
export default Navbar;
