import React from "react";
import { connect } from "react-redux";
import lastfmApi from "../lib/lastfm-api";
import { hashHistory } from "react-router";
import axios from "axios";

<<<<<<< HEAD
const lastfmKey = {
  api_key: "5df8d91bac81fb9ea65ca73b43ecec62",
  secret: "1186a5beaa848cba51f710c4685be2e9"
};
=======
var mySimilar = [];
>>>>>>> working

export const searchArtist = artist => {
  const getsimilarOptions = {
    artist: artist.artist,
    limit: '1000'
  };
  
  return dispatch => {
    dispatch({
      type: "SEARCH_ATTEMPT",
      artistEntered: artist.artist
    });
    axios
      .get(
        `${lastfmApi('artist.getsimilar', getsimilarOptions)}`
      )
      .then(function(response) {
        console.log(response.data.similarartists.artist);
        dispatch({
          type: "SEARCH_SUCCESS",
          artistsSimilar: response.data.similarartists.artist
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
