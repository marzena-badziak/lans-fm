import md5 from "md5";
import axios from "axios";
import { lastfmKey, lastfmRequestURLMaker } from "../lib/lastfm-api"
import _ from "lodash";

export const fetchSongListAndScrobbleAlbum = (data) => {
  const getAlbumOptions = {
    method: "album.getInfo",
    artist: data.artist,
    album: data.album,
    api_key: lastfmKey.api_key,
    format: "json"
  };

  return dispatch => {
    axios({
      method:   "GET",
      url: `${lastfmRequestURLMaker(getAlbumOptions)}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(resp => {
        scrobbleAlbum2({
          session: data.session,
          album: resp.data
        })
      })
      .catch(function(error) {
        console.log(error);
      })
  }
}

export const scrobbleAlbum = (data) => {
  let scrobbleRequest = "";
  let scrobbleOptions = {
    sk: data.session.sessionKey,
    api_key: lastfmKey.api_key,
  };
  let i = 0;
  let scrobbleParams;
  console.log(data.album.album.tracks.track);
    _.forEach(data.album.album.tracks.track, function(track) {
      let artistKey = "artist[" + i + "]";
      let titleKey = "title[" + i + "]";
      let timestampKey = "timestamp[" + i + "]";
    scrobbleParams = {
      ...scrobbleParams,
      [artistKey]: track.artist.name,
      [titleKey]: track.name,
      [timestampKey]: Math.floor((Date.now() / 1000) - track.duration),
    }
    i++;
  })
    let apiSig = "";
    scrobbleParams = {
      ...scrobbleParams,
      api_key: lastfmKey.api_key,
      sk: data.session.sessionKey,
      method: "track.scrobble"
    }

    Object.keys(scrobbleParams).sort().forEach(function(key) {
        var value = scrobbleParams[key];
        apiSig += key + value;
    });

    apiSig += lastfmKey.secret;
    apiSig = md5(apiSig);
    scrobbleParams = {...scrobbleParams, api_sig: apiSig};
  return dispatch => {
    axios({
        method: "POST",
        url: `${lastfmRequestURLMaker(scrobbleParams)}`,
        headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            }
    })
      .then(function(response) {
        alert("Scrobbled");
      })
      .catch(function(error) {
        console.log(error);
      });
    }
}













const scrobbleAlbum2 = (data) => {
  let scrobbleRequest = "";
  let scrobbleOptions = {
    sk: data.session.sessionKey,
    api_key: lastfmKey.api_key,
  };
  let i = 0;
  let scrobbleParams;
  console.log(data.album.album.tracks.track);
    _.forEach(data.album.album.tracks.track, function(track) {
      let artistKey = "artist[" + i + "]";
      let titleKey = "title[" + i + "]";
      let timestampKey = "timestamp[" + i + "]";
    scrobbleParams = {
      ...scrobbleParams,
      [artistKey]: track.artist.name,
      [titleKey]: track.name,
      [timestampKey]: Math.floor((Date.now() / 1000) - track.duration),
    }
    i++;
  })
    let apiSig = "";
    scrobbleParams = {
      ...scrobbleParams,
      api_key: lastfmKey.api_key,
      sk: data.session.sessionKey,
      method: "track.scrobble"
    }

    Object.keys(scrobbleParams).sort().forEach(function(key) {
        var value = scrobbleParams[key];
        apiSig += key + value;
    });

    apiSig += lastfmKey.secret;
    apiSig = md5(apiSig);
    scrobbleParams = {...scrobbleParams, api_sig: apiSig};
    axios({
        method: "POST",
        url: `${lastfmRequestURLMaker(scrobbleParams)}`,
        headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            }
    })
      .then(function(response) {
        alert("Scrobbled");
      })
      .catch(function(error) {
        console.log(error);
      });
}
