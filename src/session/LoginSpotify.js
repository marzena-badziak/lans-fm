import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

class LoginSpotify extends Component {
  constructor(props) {
    super(props);

    var url = window.location.href;
    var spotifyParams = /#access_token=([^&]+)&token_type=([^&]+)&expires_in=([^&]+)&state=([^&]+)/g;
    var match = spotifyParams.exec(url);
    var token = match[1];
    var expires = match[3];
    var spotifyRandomState = match[4];
    console.log(url);
    console.log(spotifyRandomState);

    console.log("got token: " + token + " " + expires);

    if (spotifyRandomState === this.props.session.spotifyStateString) {
      this.props.dispatch({
        type: "SPOTIFY_LOGIN",
        spotifyAccessToken: token,
        spotifyExpiresIn: Date.now() + 1000 * parseInt(expires, 10)
      });
    } else {
      console.log("error during login, invalid state");
    }

    this.props.router.push("/");
  }
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
