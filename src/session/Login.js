import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import { withRouter } from "react-router";
import {loginAction} from './login-actions';

class Login extends Component {
  constructor(props) {
    super(props);
  }

getQueryVariable = (variable) =>  {
         var query = window.location.search.substring(1);
         var vars = query.split("&");
         for (var i=0;i<vars.length;i++) {
                 var pair = vars[i].split("=");
                 if(pair[0] == variable){return pair[1];}
         }
         return(false);
  }

  login = () => {
    this.props.dispatch(
      loginAction(
        this.getQueryVariable("token")
      )
    );
  };

  render() {
    this.login()
    this.props.router.push("searchResults");
    return (
      <div></div>
    );
  }
}

export default connect()(Login);
