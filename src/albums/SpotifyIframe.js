import React, { Component } from "react";
import PropTypes from "prop-types";
export class SpotifyIframe extends Component {
  render() {
    return (
      <iframe
        src={
          "https://open.spotify.com/embed?uri=" +
          this.props.spotifyUri +
          "&theme=white"
        }
        width={this.props.width}
        height={this.props.height}
        frameBorder="0"
        allowTransparency="true"
        title={this.props.title}
      />
    );
  }
}
SpotifyIframe.propTypes = {
  title: PropTypes.string,
  spotifyUri: PropTypes.string
};
