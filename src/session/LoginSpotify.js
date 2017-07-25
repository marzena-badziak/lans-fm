import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import { withRouter } from "react-router";

class LoginSpotify extends Component {
  constructor(props) {
    super(props);

    let url = window.location.href;
    let spotifyParams = /#access_token=([^&]+)&token_type=([^&]+)&expires_in=([^&]+)&state=([^&]+)/g;
    let match = spotifyParams.exec(url);
    let token = match[1];
    let expires = match[3];
    let spotifyRandomState = match[4];

    if (spotifyRandomState === this.props.session.spotifyStateString) {
      this.props.dispatch({
        type: "SPOTIFY_LOGIN",
        spotifyAccessToken: token,
        spotifyExpiresIn: Date.now() + 1000 * parseInt(expires)
      });
    } else {
    }
  }
  componentDidMount = () => {
    this.props.router.push(`${this.props.session.currentPath}`);
  };
  render() {
    return null;
  }
}

const mapStateToProps = state => {
  return {
    session: state.session
  };
};

export default connect(mapStateToProps)(withRouter(LoginSpotify));
