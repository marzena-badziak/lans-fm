import React, { Component } from "react";
import FlatButton from "material-ui/FlatButton";
import { connect } from "react-redux";
import DropDownMenu from "material-ui/DropDownMenu";
import IconMenu from "material-ui/IconMenu";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui/svg-icons/navigation/menu";
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
    if (this.props.session.sessionKey === "") {
      return (
        <div>
          <StyledLoginBox>
            <MediaQuery query="(min-device-width: 481px)">
              <form action="http://www.last.fm/api/auth ">
                <input
                  type="hidden"
                  name="api_key"
                  value="5df8d91bac81fb9ea65ca73b43ecec62"
                />
                <input
                  type="hidden"
                  name="cb"
                  value={`http://localhost:3000/login`}
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

            <MediaQuery query="(max-device-width: 480px)">
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
                  marginTop: "0px"
                }}
              >
                <MenuItem
                  value={1}
                  primaryText="Login to last.fm"
                  onClick={function Redirect() {
                    window.location =
                      "http://www.last.fm/api/auth?api_key=5df8d91bac81fb9ea65ca73b43ecec62&cb=http%3A%2F%2Flocalhost%3A3000%2Flogin";
                  }}
                />
              </IconMenu>
            </MediaQuery>
          </StyledLoginBox>
        </div>
      );
    } else {
      return (
        <StyledLoginBox>
          <MediaQuery query="(min-device-width: 481px)">
            <StyledLoginInfo>
              Hi, {this.props.session.username}
            </StyledLoginInfo>
            <DropDownMenu
              onChange={this.handleChange}
              value="1"
              style={{
                verticalAlign: "bottom",
                marginTop: "0px"
              }}
            >
              <MenuItem
                value={1}
                primaryText="Logout from last.fm"
                onClick={() => this.logOut()}
              />
            </DropDownMenu>
          </MediaQuery>
          <MediaQuery query="(max-device-width: 480px)">
            <IconMenu
              onChange={this.handleChange}
              iconButtonElement={
                <IconButton style={{ padding: "0" }}>
                  <MenuIcon />
                </IconButton>
              }
              iconStyle={{ color: "white", border: "1px solid black" }}
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

const StyledLoginInfo = styled.span`
  vertical-align: middle;
  letter-spacing: 0px;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 14px;
  color: white;
  margin-right: 8px;
`;

const StyledLoginBox = styled.div`
  outline: medium none;
  vertical-align: middle;
  display: inline-block;
  text-decoration: none;
  margin: 0px;
  padding: 0px;
  ${"" /* border: 1px solid pink; */} ${"" /*
  box-sizing: border-box;
  font-family: Roboto, sans-serif;

  font-size: inherit;
  font-weight: inherit;
  position: relative;
  z-index: 1;
  height: 36px;
  line-height: 36px;
  min-width: 88px;
  color: rgba(0, 0, 0, 0.87);
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  border-radius: 2px;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0);
  text-align: center;
  -moz-user-select: none; */};
`;

const mapStateToProps = state => {
  return {
    session: state.session
  };
};

export default connect(mapStateToProps)(LoginInfo);
