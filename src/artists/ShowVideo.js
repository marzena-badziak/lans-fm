import React, { Component } from "react";
import propTypes from "prop-types";
import styled from "styled-components";

export class ShowVideo extends Component {
  render() {
    var videoFound = "";
    if (this.props.videoFound === false) {
      videoFound = false;
    } else {
      videoFound = true;
    }
    return (
      <StyledVideoContainer>
        {videoFound === false
          ? <NoVideoFoundMessage>Video not found</NoVideoFoundMessage>
          : <iframe
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
            />}
      </StyledVideoContainer>
    );
  }
}

const StyledVideoContainer = styled.div`
  z-index: 10;
  position: relative;
  top: -302px;
  left: 0;
`;
const NoVideoFoundMessage = styled.div`
  z-index: 15;
  position: relative;
  background-color: white;
  top: 120px;
  text-align: center;
  color: #e52d27;
  font-weight: 700;
`;

ShowVideo.propTypes = {
  videoId: propTypes.string.isRequired,
  name: propTypes.string.isRequired
};

export default ShowVideo;
