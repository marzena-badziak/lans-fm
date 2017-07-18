import React, { Component } from "react";
import propTypes from "prop-types";
import axios from "axios";
import styled from "styled-components";

export class ShowVideo extends Component {
  render() {
    // console.log("showVideo render: " + this.props.videoId);
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
                top: "-342px",
                left: "0"
              }}
            >
              Video not found
            </div>
          : <div
              className="youtube-wrapper"
              style={{ zIndex: "5", position: "relative" }}
            >
              <StyledIframe
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

const StyledIframe = styled.iframe`
  position: relative;
  top: -342px;
  left: 0;
`;

ShowVideo.propTypes = {
  videoId: propTypes.string.isRequired,
  name: propTypes.string.isRequired
};

export default ShowVideo;
