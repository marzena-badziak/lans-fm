import React, { Component, PropTypes } from "react";
// import lastfmApi from "./lib/lastfm-api";
// import propTypes from "prop-types";
// var gapi = require("gapi");
import axios from "axios";

/**
 * ShowVideo
 */

export class ShowVideo extends Component {
  // eslint-disable-line react/prefer-stateless-function
  // getTopTracks = artist => {
  //
  // }

  render() {
    var videoFound = "";
    if (this.props.videoFound === false) {
      videoFound = false;
    } else {
      videoFound = true;
    }
    return (
      <div>
        {videoFound === false
          ? <div
              style={{
                zIndex: "1000",
                position: "relative",
                backgroundColor: "white",
                top: "-372px",
                left: "0"
              }}
            >
              Video not found
            </div>
          : <div
              className="youtube-wrapper"
              style={{ zIndex: "5", position: "relative" }}
            >
              <iframe
                style={{
                  zIndex: "1000",
                  position: "relative",
                  top: "-302px",
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
            </div>}
      </div>
    );
  }
}

// ShowVideo.propTypes = {
//   prop: PropTypes.type.isRequired
// };

export default ShowVideo;
