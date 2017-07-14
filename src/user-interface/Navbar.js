import React, { Component } from "react";
import SearchBar from "./SearchBar";
import SearchBarTop from "./SearchBarTop";
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
        iconElementRight={<FlatButton label="Login" />}
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
  background-color: #944dff;
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
  }
`;

export default Navbar;
