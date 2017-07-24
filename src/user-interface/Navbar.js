import React, { Component } from "react";
import SearchBar from "./SearchBar";
import styled from "styled-components";
import AppBar from "material-ui/AppBar";
import { connect } from "react-redux";
import LoginInfo from "../session/LoginInfo";
import injectTapEventPlugin from "react-tap-event-plugin";

injectTapEventPlugin();
class Navbar extends Component {
  render() {
    return (
      <StyledAppBar
        style={{ background: "none" }}
        iconElementLeft={<StyledLogo href="/">LansFm</StyledLogo>}
        title={
          <StyledSearchBar
            boxShadow=" 0px 0px 0px 0px rgba(0, 0, 0, 0)"
            height="35px"
          />
        }
        iconElementRight={
          <LoginInfo currentPageParams={this.props.urlParams} />
        }
        iconStyleLeft={{ marginTop: "0px" }}
        iconStyleRight={{ marginTop: "0px" }}
        showMenuIconButton={true}
      />
    );
  }
}

const StyledSearchBar = styled(SearchBar)`
  width: 30vw;
  font-size: 16px;
  margin-top: 14px;
  /* Smartphones (portrait and landscape) ----------- */
  @media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
    width: 45vw;
    font-size: 10px;
    margin-top: 15px 0;
  }
  /* Smartphones (portrait) ----------- */
  @media only screen and (max-width : 320px) {
    width: 43vw;
    font-size: 10px;
    margin: 15px 0;
  }
`;
const StyledAppBar = styled(AppBar)`
  display: flex;
  align-items: center;
  ${"" /* align-items: stretch; */}
  padding: 3px;

  /* Smartphones (portrait and landscape) ----------- */
  @media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
    padding: 2px;
  }

  /* Smartphones (portrait) ----------- */
  @media only screen and (max-width : 320px) {
    padding: 2px;
  }

`;

const StyledLogo = styled.a`
  font-family: Righteous;
  color: white;
  font-size: x-large;
  padding: 0;
  margin: -3px 0 15px 30px;
  ${"" /* margin-left: 30px; */} &:hover {
    color: #333;
    text-decoration: none;
  }
  /* Smartphones (portrait and landscape) ----------- */
  @media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
    font-size: large;
    margin-left: 10px;
  }

  /* Smartphones (portrait) ----------- */
  @media only screen and (max-width: 320px) {
    font-size: medium;
    margin-left: 3px;
  }
`;
const mapStateToProps = state => {
  return {
    session: state.session
  };
};

export default connect(mapStateToProps)(Navbar);
