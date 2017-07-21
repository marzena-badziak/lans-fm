import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import { withRouter } from "react-router";

class LoginSpotify extends Component {
  // getParameterByName = name => {
  //   var url = window.location.href;
  //   name = name.replace(/[\[\]]/g, "\\$&");
  //   var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
  //     results = regex.exec(url);
  //
  //   if (!results) return null;
  //   if (!results[2]) return "";
  //
  //   return decodeURIComponent(results[2].replace(/\+/g, " "));
  // };

  login = () => {
    var url = window.location.href;
    var spotifyParams = /#access_token=([^&]+)&token_type=([^&]+)&expires_in=([^&]+)/g;
    var match = spotifyParams.exec(url);
    var token = match[1];
    var expires = match[3];

    console.log("got token: " + token + " " + expires);

    this.props.dispatch({
      type: "SPOTIFY_LOGIN",
      spotifyAccessToken: token,
      spotifyExpiresIn: new Date(Date.now() + 1000 * parseInt(expires))
    });
  };

  render() {
    this.login();
    //this.props.router.push("/");
    return <div />;
  }
}

export default connect()(withRouter(LoginSpotify));
