import md5 from "md5";
import axios from "axios";
import { lastfmKey, lastfmScrobble } from "../lib/lastfm-api"
import _ from "lodash";

export const scrobbleAlbum = (data) => {
  let scrobbleRequest = "";
  let scrobbleOptions = {
    sk: data.session.sessionKey,
    api_key: lastfmKey.api_key,
  };

  let params
    _.forEach(data.album.album.tracks.track, function(track) {
    params = {
      artist: track.artist.name,
      title: track.name,
      timestamp: Math.floor((Date.now() / 1000)),
      api_key: lastfmKey.api_key,
      sk: data.session.sessionKey,
      method: "track.scrobble"
    }
    let apiSig = "";
    Object.keys(params).sort().forEach(function(key) {
      if (key != "format") {
        var value = params[key];
        apiSig += key + value;

      }
    });
    apiSig += lastfmKey.secret;
    apiSig = md5(apiSig);
    params = {...params, api_sig: apiSig};
  })

/*  _.forEachRight(data.album.album.tracks.track, function(track) {
    timestampOfScrobble -= track.duration;
    scrobbleRequest +=
      `&track[${i}]=${track.name}&artist[${i}]=${track.artist.name}&timestamp[${i}]=${timestampOfScrobble}&mbid[${i}]=${track.mbid}`;
    i++
  });*/
  return dispatch => {
    axios({
        method: "POST",
        url: `${lastfmScrobble(params)}`,
        headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            }
    })
      .then(function(response) {
        console(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    }
}
