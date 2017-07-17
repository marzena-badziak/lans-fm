import React, { Component } from "react";
import SearchBar from "./SearchBar";
import styled from "styled-components";
import AppBar from "material-ui/AppBar";
import FlatButton from "material-ui/FlatButton";

class Navbar extends Component {
  render() {
    return (
      <AppBar
        style={{ backgroundColor: "#8585ad" }}
        iconElementLeft={<StyledLogo href="#">LansFm</StyledLogo>}
        title={
          <SearchBar
            boxShadow=" 0px 0px 0px 0px rgba(0, 0, 0, 0)"
            width="50%"
            height="50px"
            style={{ marginTop: "7px" }}
          />
        }
          iconElementRight={
            <form action="http://www.last.fm/api/auth ">
              <input type="hidden" name="api_key" value="5df8d91bac81fb9ea65ca73b43ecec62" />
              <input type="hidden" name="cb" value="http://localhost:3001/#/login" />
              <FlatButton type="submit" label="Login" />
            </form>
          }
        showMenuIconButton={true}
      />
    );
  }
}

const StyledTopSearchBar = styled(SearchBar)`
  background-color: red;
  font-size: 10px;
`;
const StyledAppBar = styled(AppBar)`
  background-color: #BB77AA;
  display: flex;
  align-items: baseline;

`;
const StyledLogo = styled.a`
  font-family: Righteous;
  color: white;
  font-size: x-large;
  &:hover {
    color: #e7f7ff;
    text-decoration: none;
`;

export default Navbar;
