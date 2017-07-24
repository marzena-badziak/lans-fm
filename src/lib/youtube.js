import axios from "axios";
import { lastfmKey } from "../lib/lastfm-api";
import md5 from "md5";

export default class YouTubeLogic {
  constructor(youTubeFlagsCallback, lastFMSessionKey) {
    this.youTubeFlagsCallback = youTubeFlagsCallback;
    this.lastFMSessionKey = lastFMSessionKey;

    this.nowPlayingArtist = "";
    this.nowPlayingTitle = "";
  }

  getYoutubeVideoId = searchRequest => {
    axios
      .get(searchRequest)
      .then(response => {
        let vId = response.data.items[0].id.videoId;
        this.youTubeFlagsCallback(vId, true, true);

        axios
          .get(
            "https://www.googleapis.com/youtube/v3/videos?id=" +
              vId +
              "&part=contentDetails" +
              "&key=AIzaSyBdXp1WnmYGXXuDFybXxK_94awGD5Qm-Zw"
          )
          .then(resp => {
            let duration = this.yTDurationToSeconds(
              resp.data.items[0].contentDetails.duration
            );

            let timestamp = Math.floor(Date.now() / 1000);
            let ytTitle = response.data.items[0].snippet.title;

            const getArtistTitle = require("get-artist-title");
            const [artist, title] = getArtistTitle(ytTitle, {
              defaultArtist: response.data.items[0].snippet.channelTitle
            });

            this.nowPlayingTitle = title;
            this.nowPlayingArtist = artist;
            this.scrobbleYouTubeVideo(artist, title, timestamp, duration);
          });
      })
      .catch(err => {
        this.youTubeFlagsCallback("", true, false);
      });
  };
  yTDurationToSeconds = duration => {
    let match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    let hours = parseInt(match[1]) || 0;
    let minutes = parseInt(match[2]) || 0;
    let seconds = parseInt(match[3]) || 0;
    return hours * 3600 + minutes * 60 + seconds;
  };
  scrobbleYouTubeVideo = (artist, title, timestamp, duration) => {
    setTimeout(() => {
      if (this.nowPlayingArtist !== artist || this.nowPlayingTitle !== title) {
        console.log("track won't be scrobbled");
        return;
      }
      let sig = md5(
        "api_key" +
          lastfmKey.api_key +
          "artist" +
          artist +
          "methodtrack.scrobblesk" +
          this.lastFMSessionKey +
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
            this.lastFMSessionKey +
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
}
