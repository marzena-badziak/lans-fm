import React, { Component } from "react";
import FlatButton from "material-ui/FlatButton";
import { connect } from "react-redux";
import DropDownMenu from "material-ui/DropDownMenu";
import IconMenu from "material-ui/IconMenu";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui/svg-icons/navigation/menu";
import NavigationArrowDropDown from "material-ui/svg-icons/navigation/arrow-drop-down";
import MenuItem from "material-ui/MenuItem";
import styled from "styled-components";
import MediaQuery from "react-responsive";

class LoginInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 0 };
  }

  handleChange = (event, index, value) => this.setState({ value });

  logOut = () => {
    this.props.dispatch({
      type: "USER_LOGOUT"
    });
  };

  loginInfo = () => {
    let currentUrl = this.props.currentPageParams;
    if (this.props.session.sessionKey === "") {
      return (
        <StyledLoginBox>
          <MediaQuery query="(min-width: 601px)">
            <form action="http://www.last.fm/api/auth ">
              <input
                type="hidden"
                name="api_key"
                value="5df8d91bac81fb9ea65ca73b43ecec62"
              />
              <input
                type="hidden"
                name="cb"
                value={`http://localhost:3000/login?currentUrl=${this.props
                  .currentPageParams}`}
              />
              <FlatButton
                type="submit"
                label="Login to last.fm"
                labelStyle={{
                  color: "white",
                  fontWeight: "700",
                  marginRight: "0"
                }}
              />
            </form>
          </MediaQuery>

          <MediaQuery query="(max-width: 600px)">
            <IconMenu
              onChange={this.handleChange}
              iconButtonElement={
                <IconButton>
                  <MenuIcon />
                </IconButton>
              }
              iconStyle={{ color: "white" }}
              anchorOrigin={{ horizontal: "right", vertical: "top" }}
              targetOrigin={{ horizontal: "right", vertical: "top" }}
              style={{
                verticalAlign: "center",
                marginTop: "-5px",
                marginRight: "-5px"
              }}
            >
              <MenuItem
                value={1}
                primaryText="Login to last.fm"
                onClick={function Redirect() {
                  window.location =
                    "http://www.last.fm/api/auth?api_key=5df8d91bac81fb9ea65ca73b43ecec62&cb=http%3A%2F%2Flocalhost%3A3000%2Flogin?currentUrl=" +
                    currentUrl;
                }}
              />
            </IconMenu>
          </MediaQuery>
        </StyledLoginBox>
      );
    } else {
      return (
        <StyledLoginBox>
          <MediaQuery query="(min-width: 701px)">
            <StyledLoginInfo>
              Hi, {this.props.session.username}
            </StyledLoginInfo>
            <IconMenu
              onChange={this.handleChange}
              iconButtonElement={
                <IconButton style={{ padding: "0" }}>
                  <NavigationArrowDropDown />
                </IconButton>
              }
              iconStyle={{ color: "white" }}
              anchorOrigin={{ horizontal: "right", vertical: "top" }}
              targetOrigin={{ horizontal: "right", vertical: "top" }}
              style={{
                verticalAlign: "center",
                marginTop: "0px"
              }}
            >
              <MenuItem
                value={1}
                primaryText="Logout from last.fm"
                onClick={() => this.logOut()}
              />
            </IconMenu>
          </MediaQuery>
          <MediaQuery query="(max-width: 700px)">
            <IconMenu
              onChange={this.handleChange}
              iconButtonElement={
                <IconButton style={{ padding: "0" }}>
                  <MenuIcon />
                </IconButton>
              }
              iconStyle={{ color: "white" }}
              anchorOrigin={{ horizontal: "right", vertical: "top" }}
              targetOrigin={{ horizontal: "right", vertical: "top" }}
              style={{
                verticalAlign: "center",
                marginTop: "-5px",
                marginRight: "-15px"
              }}
            >
              <MenuItem
                value={1}
                primaryText="Logout from last.fm"
                onClick={() => this.logOut()}
              />
            </IconMenu>
          </MediaQuery>
        </StyledLoginBox>
      );
    }
  };

  render() {
    return (
      <span>
        {this.loginInfo()}
      </span>
    );
  }
}

const StyledLoginInfo = styled.div`
  ${"" /* vertical-align: middle;
  letter-spacing: 0px; */} position: relative;
  top: -8px;
  display: inline-block;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 14px;
  color: white;
  padding: 0;
  border: 1px dotted blue;
`;

const StyledLoginBox = styled.div`
  outline: medium none;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  align-content: center;
  text-decoration: none;
  margin: 0px;
  padding: 0px;
`;

const mapStateToProps = state => {
  return {
    session: state.session
  };
};

export default connect(mapStateToProps)(LoginInfo);
