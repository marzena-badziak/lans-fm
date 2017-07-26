import { lastfmRequestURLMaker, lastfmKey } from "../lib/lastfm-api";
import axios from "axios";

export const getAlbums = data => {
  const getAlbumOptions = {
    artist: data.data,
    limit: "10",
    method: "artist.gettopalbums",
    api_key: lastfmKey.api_key
  };
  return dispatch => {
    dispatch({
      type: "SEARCH_ALBUMS_ATTEMPT"
    });
    axios
      .get(`${lastfmRequestURLMaker(getAlbumOptions)}`)
      .then(function(response) {
        if (response.data.topalbums) {
          dispatch({
            type: "SEARCH_ALBUMS",
            payload: response.data.topalbums
          });
        } else {
          dispatch({
            type: "NO_ALBUMS"
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};

export const getAlbumInfo = data => {
  const getAlbumOptions = {
    artist: data.artist,
    album: data.album,
    api_key: lastfmKey.api_key,
    method: "album.getInfo"
  };
  return dispatch => {
    dispatch({
      type: "GET_INFO_ATTEMPT"
    });
    axios
      .get(`${lastfmRequestURLMaker(getAlbumOptions)}`)
      .then(function(response) {
        if (!response.data.error) {
          dispatch({
            type: "GET_ALBUM_INFO",
            payload: response.data.album
          });
        } else {
          dispatch({
            type: "NO_ALBUM_INFO"
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};

export const getArtistInfo = data => {
  const getArtistOptions = {
    artist: data.artist,
    api_key: lastfmKey.api_key,
    method: "artist.getInfo"
  };

  return dispatch => {
    dispatch({
      type: "GET_ARTIST_INFO_ATTEMPT"
    });
    axios
      .get(`${lastfmRequestURLMaker(getArtistOptions)}`)
      .then(function(response) {
        dispatch({
          type: "GET_ARTIST_INFO",
          payload: response.data.artist
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};
