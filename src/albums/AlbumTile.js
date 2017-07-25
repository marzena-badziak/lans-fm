import React, { Component } from "react";
import { Card, CardActions, CardMedia, CardTitle } from "material-ui/Card";
import styled from "styled-components";
import FlatButton from "material-ui/FlatButton";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { fetchSongListAndScrobbleAlbum } from "./scrobble-album";
import FontAwesome from "react-fontawesome";
import YouTubeLogic from "../lib/youtube";
import ShowVideo from "../artists/ShowVideo";

class AlbumTile extends Component {
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

  setImage = () => {
    if (this.props.image) {
      return this.props.image;
    } else {
      return "https://lastfm-img2.akamaized.net/i/u/174s/c6f59c1e5e7240a4c0d427abd71f3dbb.png";
    }
  };

  openAlbum = () => {
    return this.props.router.push(
      "/" +
        this.replaceSpacesWithDashes(this.props.params.artistName) +
        "/" +
        this.replaceSpacesWithDashes(this.props.params.artistChosen) +
        "/" +
        this.replaceSpacesWithDashes(this.props.title)
    );
  };

  replaceSpacesWithDashes(str) {
    return str.replace(/\s+/g, "-");
  }
  scrobbleAlbum = e => {
    this.props.dispatch(
      fetchSongListAndScrobbleAlbum({
        artist: this.props.artist,
        album: this.props.title,
        session: this.props.session
      })
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
      this.props.artist +
      "+" +
      this.props.title +
      "&type=video&key=AIzaSyBdXp1WnmYGXXuDFybXxK_94awGD5Qm-Zw";
    this.youTubeLogic.getYoutubeVideoId(searchRequest);
    console.log(searchRequest);
  };

  render() {
    return (
      <StyledAlbumCard>
        <AlbumImage
          onClick={() => this.openAlbum()}
          overlay={
            <CardTitle title={this.props.title} subtitle={this.props.artist} />
          }
        >
          <img src={this.setImage()} alt={`${this.props.title} cover`} />
        </AlbumImage>
        <StyledYouTubeFontAwesome
          onClick={e => this.playVideo()}
          className="fa fa-youtube-play"
          name="play"
          size="3x"
        />
        {this.state.playVideo
          ? <ShowVideo
              artist={this.props.name}
              videoId={this.state.videoId}
              videoFound={this.state.videoFound}
            />
          : null}
        <CardActions>
          <FlatButton
            label="Scrobble"
            backgroundColor="plum"
            onClick={() => this.scrobbleAlbum()}
            hoverColor="#ccd4d4"
          />
          <FlatButton
            label="Show Album"
            backgroundColor="hotpink"
            onClick={() => this.openAlbum()}
            hoverColor="#ccd4d4"
          />
        </CardActions>
      </StyledAlbumCard>
    );
  }
}
const StyledAlbumCard = styled(Card)`
${"" /* overflow: hidden;
display: inline-block; */}
position: relative;
width: 260px;
margin 0 auto;
margin-top: 30px;

`;
const AlbumImage = styled(CardMedia)`

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

AlbumTile.propTypes = {
  title: propTypes.string,
  image: propTypes.string,
  artist: propTypes.string
};

const mapStateToProps = state => {
  return {
    session: state.session
  };
};
export default connect(mapStateToProps)(withRouter(AlbumTile));
