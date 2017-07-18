import React, { Component } from "react";
import SearchBar from "./SearchBar";
import styled from "styled-components";
import AppBar from "material-ui/AppBar";
import FlatButton from "material-ui/FlatButton";
import { connect } from "react-redux";
import LoginInfo from "../session/LoginInfo";

class Navbar extends Component {


  render() {
    return (
      <StyledAppBar
        style={{ backgroundColor: "#8585ad" }}
        iconElementLeft={<StyledLogo href="#">LansFm</StyledLogo>}
        title={
          <StyledSearchBar
            boxShadow=" 0px 0px 0px 0px rgba(0, 0, 0, 0)"
            // width="50%"
            height="50px"
            style={{ marginTop: "7px" }}
          />
        }
<<<<<<< HEAD
          iconElementRight={<LoginInfo />} showMenuIconButton={true}
=======
        iconElementRight={
          <StyledForm action="http://www.last.fm/api/auth ">
            <input
              type="hidden"
              name="api_key"
              value="5df8d91bac81fb9ea65ca73b43ecec62"
            />
            <input
              type="hidden"
              name="cb"
              value="http://localhost:3000/#/login"
            />
            <FlatButton
              type="submit"
              label="Login"
              labelStyle={{ padding: "0", margin: "0" }}
            />
          </StyledForm>
        }
        showMenuIconButton={true}
>>>>>>> 377b0eb371f9ebb46da2de9bc906c44664d7fae9
      />
    );
  }
}

const StyledSearchBar = styled(SearchBar)`
  width: 50vw;
  font-size: 16px;
  /* Smartphones (portrait and landscape) ----------- */
  @media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
    width: 45vw;
    font-size: 10px;
    margin: 3px;
  }
  /* Smartphones (portrait) ----------- */
  @media only screen and (max-width : 320px) {
    width: 45vw;
    font-size: 10px;
    margin: 3px;
  }
`;
const StyledAppBar = styled(AppBar)`
  background-color: #BB77AA;
  display: flex;
  align-items: baseline;
  padding: 2px;
  /* Smartphones (portrait and landscape) ----------- */
  @media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
    padding: 2px;
  }

  /* Smartphones (portrait) ----------- */
  @media only screen and (max-width : 320px) {
    padding: 2px;
  }

`;

const StyledForm = styled.form`
  /* Smartphones (portrait and landscape) ----------- */
  @media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
    margin: 0;
    padding: 0;
  }

  /* Smartphones (portrait) ----------- */
  @media only screen and (max-width: 320px) {
    margin: 0;
    padding: 0;
  }
`;

const StyledLogo = styled.a`
  font-family: Righteous;
  color: white;
  font-size: x-large;
  &:hover {
    color: #e7f7ff;
    text-decoration: none;
  }
  /* Smartphones (portrait and landscape) ----------- */
  @media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
    font-size: medium;
  }

  /* Smartphones (portrait) ----------- */
  @media only screen and (max-width: 320px) {
    font-size: medium;
  }
`;
const mapStateToProps = state => {
  return {
    session: state.session
  };
};

export default connect(mapStateToProps)(Navbar);
