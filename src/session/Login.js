import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { loginAction } from "./login-actions";

class Login extends Component {
  getQueryletiable = letiable => {
    let query = window.location.search.substring(1);
    let lets = query.split("&");
    for (let i = 0; i < lets.length; i++) {
      let pair = lets[i].split("=");
      if (pair[0] === letiable) {
        return pair[1];
      }
    }
    return false;
  };

  login = () => {
    this.props.dispatch(loginAction(this.getQueryletiable("token")));
  };

  render() {
    this.login();
    this.props.router.push(this.getQueryletiable("currentUrl"));
    return <div />;
  }
}

export default connect()(withRouter(Login));
