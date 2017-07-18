import React, { Component} from "react";
import propTypes from "prop-types";

/**
 * ShowVideo
 */

export class ShowVideo extends Component {
  // eslint-disable-line react/prefer-stateless-function
  // getTopTracks = artist => {
  //
  // }

  render() {
    // console.log("showVideo render: " + this.props.videoId);
    return (
      <div
        className="youtube-wrapper"
        style={{ zIndex: "5", position: "relative" }}
      >
        <iframe
          style={{
            zIndex: "1000",
            position: "relative",
            top: "-372px",
            left: "0"
          }}
          title="YouTube video player"
          className="youtube-player"
          type="text/html"
          width="260"
          height="260"
          wmode="Opaque"
          src={`http://www.youtube.com/embed/${this.props
            .videoId}?wmode=window`}
          frameBorder="0"
          allowFullScreen
        />
      </div>
    );
  }
}

ShowVideo.propTypes = {
  videoId: propTypes.string.isRequired,
  name: propTypes.string.isRequired
};

export default ShowVideo;
