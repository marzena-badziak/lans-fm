import React, { Component } from "react";
import { connect } from "react-redux";
<<<<<<< HEAD
import { Router, Route, IndexRoute, hashHistory } from "react-router";
=======
// import { Router, Route, IndexRoute, hashHistory } from "react-router";
>>>>>>> scrobbling
import { withRouter } from "react-router";
import { loginAction } from "./login-actions";

class Login extends Component {
  getQueryVariable = variable => {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) {
        return pair[1];
      }
    }
    return false;
  };

  login = () => {
    this.props.dispatch(loginAction(this.getQueryVariable("token")));
  };

  render() {
    console.log(this.getQueryVariable("token"))
    this.login();
    this.props.router.push("searchResults");
    return <div />;
  }
}

export default connect()(withRouter(Login));
