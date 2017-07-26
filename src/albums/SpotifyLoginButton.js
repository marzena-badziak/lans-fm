import React, { Component } from "react";
import FlatButton from "material-ui/FlatButton";
import FontAwesome from "react-fontawesome";
import styled from "styled-components";
import { connect } from "react-redux";

class SpotifyLoginButton extends Component {
  saveCurrentPath = e => {
    this.props.dispatch({
      type: "SAVE_CURRENT_PATH",
      currentPath: this.props.redirectUrl
    });
  };
  render() {
    return (
      <StyledFlatButton
        label="Quick listen on Spotify"
        labelStyle={{
          fontSize: "12px",
          padding: "3px 5px"
        }}
        onClick={e => this.saveCurrentPath(e)}
        backgroundColor="#1db954"
        hoverColor="#4bdf80"
        icon={
          <FontAwesome
            className="fa fa-spotify"
            name="options"
            size="lg"
            aria-hidden="true"
          />
        }
        href={
          "https://accounts.spotify.com/authorize?client_id=7cd65f9a6005482cb3830530b1e52b16&response_type=token&redirect_uri=http://localhost:3000/loginSpotify/&state=" +
          this.props.spotifyStateString
        }
      />
    );
  }
}

const StyledFlatButton = styled(FlatButton)`
  color:black;
  margin: 5px;
`;

export default connect()(SpotifyLoginButton);
