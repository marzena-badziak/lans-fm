import React, { Component } from "react";
import PropTypes from "prop-types";
export class SpotifyFollowIframe extends Component {
  render() {
    return (
      <iframe
        src={
          "https://embed.spotify.com/follow/1/?uri=" +
          this.props.spotifyUri +
          "&theme=light&size=basic"
        }
        width={this.props.width}
        height={this.props.height}
        frameBorder="0"
        allowTransparency="true"
        scrolling="no"
        title={this.props.title}
      />
    );
  }
}
SpotifyFollowIframe.propTypes = {
  title: PropTypes.string,
  spotifyAlbumUri: PropTypes.string
};
