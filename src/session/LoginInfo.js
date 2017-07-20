import React, { Component } from "react";
import FlatButton from "material-ui/FlatButton";
import { connect } from "react-redux";
import { lastfmKey } from "../lib/lastfm-api";
import styled from "styled-components";

class LoginInfo extends Component {
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
            value="http://localhost:3000/#/login"
          />
          <FlatButton
            type="submit"
            label="Login"
            labelStyle={{
              color: "white",
              fontWeight: "700",
              marginRight: "8px"
            }}
          />
        </form>
      );
    } else {
      return (
        <FlatButton
          onClick
          label="Logout"
          labelStyle={{
            color: "white",
            fontWeight: "700",
            marginRight: "8px"
          }}
        />
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

const mapStateToProps = state => {
  return {
    session: state.session
  };
};

export default connect(mapStateToProps)(LoginInfo);
