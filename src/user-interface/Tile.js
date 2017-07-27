import React, { Component } from "react";
import FontAwesome from "react-fontawesome";
import YouTubeLogic from "../lib/youtube";
import ShowVideo from "../artists/ShowVideo";
import { Card, CardActions, CardMedia, CardTitle } from "material-ui/Card";
import styled from "styled-components";
import RaisedButton from "material-ui/RaisedButton";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import CircularProgress from "material-ui/CircularProgress";

class Tile extends Component {
  constructor(props) {
    super(props);

    this.youTubeLogic = new YouTubeLogic(
      this.setYouTubeFlags,
      this.props.session.sessionKey
    );
    this.enableYouTube = false;

    this.state = {
      playVideo: false,
      videoId: "",
      videoFound: true,
      opacity: 0,
      showYouTubeIcon: false,
      imageLoaded: false,
      imageDisplay: "none"
    };
  }
  setOpacity(val) {
    this.setState({ opacity: val });
  }

  setYouTubeFlags = (videoId, playFlag, foundFlag) => {
    this.setState({
      videoId: videoId,
      playVideo: playFlag
    });
  };
  showYouTubeIcon = e => {
    e.preventDefault();
    this.setState({ showYouTubeIcon: true });
  };
  hideYouTubeIcon = e => {
    e.preventDefault();
    this.setState({ showYouTubeIcon: false });
  };

  playVideo = () => {
    let searchRequest =
      "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" +
      this.props.artist +
      "+" +
      this.props.title +
      "&type=video&key=AIzaSyBdXp1WnmYGXXuDFybXxK_94awGD5Qm-Zw";
    this.youTubeLogic.getYoutubeVideoId(searchRequest);
  };

  imageLoaded = () => {
    this.setState({
      imageDisplay: "block"
    });
  };
  render() {
    return (
      <StyledAlbumCard
        onMouseEnter={e => this.showYouTubeIcon(e)}
        onMouseLeave={e => this.hideYouTubeIcon(e)}
      >
        <AlbumImage
          onClick={this.props.opener()}
          onMouseLeave={() => this.setOpacity(0)}
          onMouseEnter={() => this.setOpacity(1)}
          overlay={
            <CardTitle
              title={this.props.cardTitle}
              subtitle={this.props.subtitle}
            />
          }
        >
          {this.state.imageDisplay === "block"
            ? <img
                style={{ display: this.state.imageDisplay }}
                src={this.props.imageSrc}
                alt={this.props.imageAlt}
                onLoad={() => this.imageLoaded()}
              />
            : <div>
                {" "}<img
                  style={{ display: this.state.imageDisplay }}
                  src={this.props.imageSrc}
                  alt={this.props.imageAlt}
                  onLoad={() => this.imageLoaded()}
                />
                <CircularProgress
                  style={{ height: "260px", marginTop: "40px" }}
                  size={130}
                  color="#aa8899"
                />
              </div>}

          <Overlay style={{ opacity: this.state.opacity }}>
            <TextOnOverlay>
              {this.props.labelSecond}
            </TextOnOverlay>
          </Overlay>
          {
            //NIE USUWAĆ TEGO
          }
          {/*
          {this.enableYouTube
            ? this.state.showYouTubeIcon
              ? <StyledYouTubeFontAwesome
                  onClick={e => this.playVideo()}
                  className="fa fa-youtube-play"
                  name="play"
                  size="3x"
                />
              : null
            : null}
          {this.state.playVideo
            ? <ShowVideo
                artist={this.props.name}
                videoId={this.state.videoId}
                videoFound={this.state.videoFound}
              />
            : null}*/}
        </AlbumImage>
        <StyledCardActions>
          <StyledRaisedButton
            label={this.props.labelFirst}
            backgroundColor="plum"
            onClick={this.props.firstButtonOnClick()}
            hoverColor="#ccd4d4"
            labelStyle={{
              padding: "10px",
              color: "white"
            }}
          />
          <StyledRaisedButton
            label={this.props.labelSecond}
            backgroundColor="#7a3e5e"
            onClick={this.props.secondButtonOnClick()}
            hoverColor="#ccd4d4"
            labelStyle={{
              padding: "5px",
              color: "white"
            }}
          />
        </StyledCardActions>
      </StyledAlbumCard>
    );
  }
}
const StyledAlbumCard = styled(Card)`
  position: relative;
  width: 260px;
  margin 0 auto;
  margin-top: 30px;
`;

const StyledCardActions = styled(CardActions)`
  display: flex;
  justify-content: space-between;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
`;
const TextOnOverlay = styled.div`
  color: white;
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
`;

const AlbumImage = styled(CardMedia)`
cursor:pointer;
transition: .2s all;

&:hover{
  -webkit-filter: brightness(80%)
}
`;

const StyledYouTubeFontAwesome = styled(FontAwesome)`
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.75);
  color: #b31217;
  position: absolute;
  z-index: 5;
  top: 10px;
  left: 10px;
  cursor: pointer;
  &:hover {
    color: #e52d27;
  }
`;
const StyledRaisedButton = styled(RaisedButton)`
  margin: 0;
`;
const mapStateToProps = state => {
  return {
    results: state.similarArtists.artistsSimilar,
    artistEntered: state.similarArtists.artistEntered,
    message: state.similarArtists.message,
    session: state.session
  };
};
export default connect(mapStateToProps)(withRouter(Tile));
