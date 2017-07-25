import React, { Component } from "react";
import PropTypes from "prop-types";
export class SpotifyIframe extends Component {
  render() {
    return (
      <iframe
        src={this.props.spotifyAlbumUrl}
        width="300"
        height="300"
        frameBorder="0"
        allowTransparency="true"
        title={this.props.title}
      />
    );
  }
}
SpotifyIframe.propTypes = {
  title: PropTypes.string,
  spotifyAlbumUrl: PropTypes.string
};
