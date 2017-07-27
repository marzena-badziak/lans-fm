import React, { Component } from "react";
import FlatButton from "material-ui/FlatButton";
import { connect } from "react-redux";
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import styled from "styled-components";
import MediaQuery from "react-responsive";

class LoginInfo extends Component {
  constructor(props) {
  super(props);
  this.state = {value: 1};
}

handleChange = (event, index, value) => this.setState({value});

  logOut = () => {
    this.props.dispatch({
      type: "USER_LOGOUT"
    });
  };

  loginInfo = () => {
    if (this.props.session.sessionKey === "") {
      return (
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
      );
    } else {
      return (
        <StyledLoginBox>
          <StyledLoginInfo>
            Hi, {this.props.session.username}
          </StyledLoginInfo>
          <DropDownMenu
            onChange={this.handleChange}
            style={{
              verticalAlign: "bottom",
              marginTop: "0px",
            }}
          >
            <MenuItem
              value={1}
              primaryText="Logout from last.fm"
              onClick={() => this.logOut()}
            />
          </DropDownMenu>
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
  border: 10px none;
  box-sizing: border-box;
  display: inline-block;
  font-family: Roboto,sans-serif;
  text-decoration: none;
  margin: 0px;
  padding: 0px;
  outline: medium none;
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
  -moz-user-select: none;
`


const mapStateToProps = state => {
  return {
    session: state.session
  };
};

export default connect(mapStateToProps)(LoginInfo);
