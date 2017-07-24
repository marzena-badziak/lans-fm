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
      videoFound: true
    };
  }

  fetchArtist = e => {
    e.preventDefault();
    this.props.dispatch(
      searchArtist({
        artist: this.props.params.artistName
      })
    );
  };
  getAlbums = e => {
    e.preventDefault();
    console.log(this.props.router);
    this.props.router.push(
      this.replaceSpacesWithDashes(this.props.params.artistName) +
        "/" +
        this.replaceSpacesWithDashes(this.props.name)
    );
  };
  replaceSpacesWithDashes(str) {
    return str.replace(/\s+/g, "-");
  }
  setYouTubeFlags = (videoId, playFlag, foundFlag) => {
    this.setState({
      videoId: videoId,
      playVideo: playFlag
    });
  };

  playVideo = () => {
    var searchRequest =
      "https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&q=" +
      this.props.name +
      "+VEVO" +
      "&type=video&key=AIzaSyBdXp1WnmYGXXuDFybXxK_94awGD5Qm-Zw";
    this.youTubeLogic.getYoutubeVideoId(searchRequest);
  };

  render() {
    return (
      <StyledArtistTile
        name={this.props.name}
        // onClick={e => this.getAlbums(e)}
      >
        <StyledArtistImage
          onClick={e => this.getAlbums(e)}
          overlay={<CardTitle title={this.props.name} />}
        >
          <img
            src={this.props.img}
            alt={this.props.alt}
            width="260px"
            height="260px"
            style={{ position: "relative", cursor: "pointer" }}
          />
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
  img: propTypes.string.isRequired
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
