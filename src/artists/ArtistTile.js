import React, { Component } from "react";
import styled from "styled-components";
import propTypes from "prop-types";
import { searchArtist } from "./search-actions";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import { Card, CardMedia, CardTitle } from "material-ui/Card";
import ShowVideo from "./ShowVideo";
import { withRouter } from "react-router";
import FontAwesome from "react-fontawesome";
import YouTubeLogic from "../lib/youtube";

class ArtistTile extends Component {
  constructor(props) {
    super(props);
    this.youTubeLogic = new YouTubeLogic(
      this.setYouTubeFlags,
      this.props.session.sessionKey
    );

    this.state = {
      playVideo: false,
      videoId: "",
      videoFound: true,
      opacity: 0
    };
  }

  fetchArtist = e => {
    e.preventDefault();
    this.props.dispatch(
      searchArtist({
        artist: this.props.name
      })
    );
    this.props.router.push(this.props.name);
  };
  replaceSpacesWithDashes(str) {
    return str.replace(/\s+/g, "-");
  }
  getAlbums = e => {
    e.preventDefault();
    this.props.router.push(
      this.props.params.artistName +
        "/" +
        this.replaceSpacesWithDashes(this.props.name)
    );
  };

  setYouTubeFlags = (videoId, playFlag, foundFlag) => {
    this.setState({
      videoId: videoId,
      playVideo: playFlag
    });
  };

  playVideo = () => {
    let searchRequest =
      "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" +
      this.props.name +
      "&type=video&key=AIzaSyBdXp1WnmYGXXuDFybXxK_94awGD5Qm-Zw";
    this.youTubeLogic.getYoutubeVideoId(searchRequest);
  };

  // showYouTubeIcon = e => {
  //   e.preventDefault();
  //
  //
  // }

  setOpacity(val) {
    this.setState({ opacity: val });
  }

  render() {
    return (
      <StyledArtistTile name={this.props.name}>
        // onMouseOver={e => this.showYouTubeIcon(e)}
        <StyledArtistImage
          onClick={e => this.getAlbums(e)}
          onMouseLeave={() => this.setOpacity(0)}
          onMouseEnter={() => this.setOpacity(1)}
          overlay={<CardTitle title={this.props.name} />}
        >
          <img
            src={this.props.img}
            alt={this.props.alt}
            width="260px"
            height="260px"
            style={{ position: "relative", cursor: "pointer" }}
          />

          <Overlay style={{ opacity: this.state.opacity }}>
            <TextOnOverlay>Show Artist</TextOnOverlay>
          </Overlay>
        </StyledArtistImage>
        <StyledYouTubeFontAwesome
          onClick={e => this.playVideo()}
          className="fa fa-youtube-play"
          name="play"
          size="3x"
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            justifyContent: "space-between",
            alignItems: "flex-start",
            padding: "3px",
            position: "relative",
            textAlign: "center"
          }}
        >
          <StyledRaisedButton
            backgroundColor="plum"
            label="Search similar"
            labelColor="#ffffff"
            value={this.props.name}
            onClick={e => this.fetchArtist(e)}
          />
          <StyledRaisedButton
            label="Albums"
            backgroundColor="hotpink"
            labelColor="#ffffff"
            onClick={e => this.getAlbums(e)}
          />
        </div>
        {this.state.playVideo
          ? <ShowVideo
              artist={this.props.name}
              videoId={this.state.videoId}
              videoFound={this.state.videoFound}
            />
          : null}
      </StyledArtistTile>
    );
  }
}

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

const StyledArtistTile = styled(Card)`
  overflow: hidden;
  position: relative;
  display: inline-block;
  margin: 15px;
  width: 260px;
  height: 307px;
  text-align: left;
  z-index: 1;
  padding: 0;
`;

const StyledArtistImage = styled(CardMedia)`
  transition: .2s all;
  &:hover {
    -webkit-filter: brightness(50%);
  }
`;

const StyledArtistName = styled.div`
  overflow: visible;
  height: 60px;
  z-index: 4;
  background: rgb(170, 136, 153);
  background: -moz-linear-gradient(
    45deg,
    rgba(170, 136, 153, 1) 0%,
    rgba(255, 224, 238, 1) 63%,
    rgba(255, 224, 238, 1) 63%
  );
  background: -webkit-linear-gradient(
    45deg,
    rgba(170, 136, 153, 1) 0%,
    rgba(255, 224, 238, 1) 63%,
    rgba(255, 224, 238, 1) 63%
  );
  background: linear-gradient(
    45deg,
    rgba(170, 136, 153, 1) 0%,
    rgba(255, 224, 238, 1) 63%,
    rgba(255, 224, 238, 1) 63%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(
      startColorstr='#aa8899',
      endColorstr='#ffe0ee',
      GradientType=1
    );
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
  margin: 3px;
`;
ArtistTile.propTypes = {
  name: propTypes.string.isRequired,
  img: propTypes.string.isRequired,
  alt: propTypes.string
};

const mapStateToProps = state => {
  return {
    results: state.similarArtists.artistsSimilar,
    artistEntered: state.similarArtists.artistEntered,
    message: state.similarArtists.message,
    session: state.session
  };
};

export default connect(mapStateToProps)(withRouter(ArtistTile));
