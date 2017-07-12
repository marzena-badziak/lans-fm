import React from "react";
import { connect } from "react-redux";
//import apiClient from "../lib/api-client";
import { hashHistory } from "react-router";
//var LastfmAPI = require("lastfmapi");
import axios from "axios";

const lastfmKey = {
  api_key: "5df8d91bac81fb9ea65ca73b43ecec62",
  secret: "1186a5beaa848cba51f710c4685be2e9"
};

var mySimilar = [];

export const searchArtist = artist => {
  return dispatch => {
    dispatch({
      type: "SEARCH_ATTEMPT",
      artistEntered: artist.artist
    });
    axios
      .get(
        `http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${artist.artist}&api_key=${lastfmKey.api_key}&limit=1000&format=json`
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
