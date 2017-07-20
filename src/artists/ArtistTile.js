import React, { Component } from "react";
import styled from "styled-components";
import propTypes from "prop-types";
import { searchArtist } from "./search-actions";
import { connect } from "react-redux";
import axios from "axios";
import RaisedButton from "material-ui/RaisedButton";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";
import ShowVideo from "./ShowVideo";
import { withRouter } from "react-router";
import FontAwesome from "react-fontawesome";
import { lastfmKey } from "../lib/lastfm-api";
import md5 from "md5";

var nowPlayingArtist;
var nowPlayingTitle;

class ArtistTile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropDownDisplay: "none",
      playVideo: false,
      videoId: "",
      videoFound: true
    };
  }

  fetchArtist = e => {
    e.preventDefault();
    this.props.dispatch(
      searchArtist({
        artist: this.props.name
      })
    );
  };
  getAlbums = e => {
    e.preventDefault();
    this.props.router.push(
      `${this.props.params.artistName}/${this.props.name}`
    );
  };

  playVideo = () => {
    var searchRequest =
      "https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&q=" +
      this.props.name +
      "+VEVO" +
      "&type=video&key=AIzaSyBdXp1WnmYGXXuDFybXxK_94awGD5Qm-Zw";
    this.getYoutubeVideoId(searchRequest);
  };

  getYoutubeVideoId = searchRequest => {
    axios
      .get(searchRequest)
      .then(response => {
        var vId = response.data.items[0].id.videoId;
        this.setState({
          videoId: vId,
          playVideo: true,
          videoFound: true
        });

        axios
          .get(
            "https://www.googleapis.com/youtube/v3/videos?id=" +
              vId +
              "&part=contentDetails" +
              "&key=AIzaSyBdXp1WnmYGXXuDFybXxK_94awGD5Qm-Zw"
          )
          .then(resp => {
            var duration = this.yTDurationToSeconds(
              resp.data.items[0].contentDetails.duration
            );

            let timestamp = Math.floor(Date.now() / 1000);
            let ytTitle = response.data.items[0].snippet.title;

            const getArtistTitle = require("get-artist-title");
            const [artist, title] = getArtistTitle(ytTitle, {
              defaultArtist: response.data.items[0].snippet.channelTitle
            });

            nowPlayingTitle = title;
            nowPlayingArtist = artist;
            this.scrobbleYouTubeVideo(artist, title, timestamp, duration);
          });
      })
      .catch(err => {
        this.setState({ playVideo: true, videoFound: false });
      });
  };
  yTDurationToSeconds = duration => {
    var match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    var hours = parseInt(match[1]) || 0;
    var minutes = parseInt(match[2]) || 0;
    var seconds = parseInt(match[3]) || 0;
    return hours * 3600 + minutes * 60 + seconds;
  };
  scrobbleYouTubeVideo = (artist, title, timestamp, duration) => {
    setTimeout(() => {
      if (nowPlayingArtist != artist || nowPlayingTitle != title) {
        console.log("track won't be scrobbled");
        return;
      }
      var sig = md5(
        "api_key" +
          lastfmKey.api_key +
          "artist" +
          artist +
          "methodtrack.scrobblesk" +
          this.props.session.sessionKey +
          "timestamp" +
          timestamp +
          "track" +
          title +
          lastfmKey.secret
      );

      axios
        .post(
          "http://ws.audioscrobbler.com/2.0/?method=track.scrobble&artist=" +
            artist +
            "&track=" +
            title +
            "&timestamp=" +
            timestamp +
            "&api_sig=" +
            sig +
            "&sk=" +
            this.props.session.sessionKey +
            "&api_key=" +
            lastfmKey.api_key
        )
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
    }, duration * 1000 / 3);
  };
  hideAlbums = e => {
    this.setState({
      dropDownDisplay: "none"
    });
  };
  render() {
    return (
      <StyledArtistTile
        img={this.props.img}
        name={this.props.name}
        onClick={e => this.getAlbums(e)}
      >
        <StyledArtistImage overlay={<CardTitle title={this.props.name} />}>
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
          size="4x"
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
  top: 60px;
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
    results: state.search.artistsSimilar,
    artistEntered: state.search.artistEntered,
    message: state.search.message,
    session: state.session
  };
};

export default connect(mapStateToProps)(withRouter(ArtistTile));
