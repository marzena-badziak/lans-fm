// import React from "react";
// import { connect } from "react-redux";
import lastfmApi from "../lib/lastfm-api";
// import { hashHistory } from "react-router";
import axios from "axios";

export const searchArtist = artist => {
  const getsimilarOptions = {
    artist: artist.artist,
    limit: "250"
  };

  return dispatch => {
    // console.log(artist);
    dispatch({
      type: "SEARCH_ATTEMPT",
      artistEntered: artist.artist
    });
    axios
      .get(`${lastfmApi("artist.getsimilar", getsimilarOptions)}`)
      .then(function(response) {
        if (typeof response.data.similarartists === "undefined") {
          dispatch({
            type: "SEARCH_NO_ARTIST"
          });
        } else {
          dispatch({
            type: "SEARCH_SUCCESS",
            artistsSimilar: response.data.similarartists.artist.reverse().slice(0, 30)
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    /*   .then((response) => {
            dispatch({
                type: "LOGIN_SUCCESS",
                data: {
                    username: user.username,
                    token: response.data.data.auth_token,
                    user_id: response.data.data.user_id
                }
            });
            hashHistory.push("artists-similar");

        })*/
  };
};
export const getAlbums = data => {
  const getAlbumOptions = {
    artist: data.data,
    limit: "10"
  };
  return dispatch => {
    axios
      .get(`${lastfmApi("artist.gettopalbums", getAlbumOptions)}`)
      .then(function(response) {
        dispatch({
          type: "SEARCH_ALBUMS",
          payload: response.data.topalbums
        });
      })
      .catch(function(error) {
        console.log(error);
      });
    /*   .then((response) => {
            dispatch({
                type: "LOGIN_SUCCESS",
                data: {
                    username: user.username,
                    token: response.data.data.auth_token,
                    user_id: response.data.data.user_id
                }
            });
            hashHistory.push("artists-similar");

        })*/
  };
};