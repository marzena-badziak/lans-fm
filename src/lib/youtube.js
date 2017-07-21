import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { lastfmKey } from "../lib/lastfm-api";
import md5 from "md5";

var nowPlayingArtist;
var nowPlayingTitle;

export default class YouTubeFunctions extends Component {
  getYoutubeVideoId = searchRequest => {
    axios
      .get(searchRequest)
      .then(response => {
        var vId = response.data.items[0].id.videoId;
        this.props.youTubeFlagsCallback(vId, true, true);

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
        this.props.youTubeFlagsCallback("", true, false);
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
          this.props.lastFMSessionKey +
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
            this.props.lastFMSessionKey +
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

  render() {
    return null;
  }
}

// const mapStateToProps = state => {
//   return {
//     results: state.search.artistsSimilar,
//     artistEntered: state.search.artistEntered,
//     message: state.search.message,
//     session: state.session
//   };
// };

//export default connect(mapStateToProps)(YouTubeFunctions);
