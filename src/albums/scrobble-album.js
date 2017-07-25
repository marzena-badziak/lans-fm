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
        if(resp.data.album.tracks.track.length === 0) {
          alert("No tracks for this album in last.fm database!")
        } else {
          scrobbleAlbum({
            session: data.session,
            album: resp.data
          })
        }
      })
      .catch(function(error) {
        console.log(error);
      })
  }
}

export const scrobbleSingleTrack = (data) => {
  let scrobbleParams = {
    artist: data.track.artist.name,
    title: data.track.name,
    timestamp: Math.floor((Date.now() / 1000) - data.track.duration),
    api_key: lastfmKey.api_key,
    sk: data.session.sessionKey,
    method: "track.scrobble"
  }
  let apiSig = generateApiSig(scrobbleParams);
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
    console.log("Scrobbled");
  })
  .catch(function(error) {
    console.log(error);
  });
}

const generateTracksParamsList = (tracks, sk) => {
  let i = 0;
  let scrobbleParams;
  _.forEach(tracks, function(track) {
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
  scrobbleParams = {
    ...scrobbleParams,
    api_key: lastfmKey.api_key,
    sk: sk,
    method: "track.scrobble"
  }
  return scrobbleParams;
}

const generateApiSig = (params) => {
  let apiSig = "";
  Object.keys(params).sort().forEach(function(key) {
      let value = params[key];
      apiSig += key + value;
  });
  apiSig += lastfmKey.secret;
  apiSig = md5(apiSig);
  return apiSig;
}

const scrobbleAlbum = (data) => {
  let scrobbleParams = generateTracksParamsList(data.album.album.tracks.track, data.session.sessionKey);
  let apiSig = generateApiSig(scrobbleParams);
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
