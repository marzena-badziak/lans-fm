import React from "react";
import { connect } from "react-redux";
// zbedny komentarz
//import {lastfmApi, lastfmKey} from "../lib/lastfm-api";
import { hashHistory } from "react-router";
import axios from "axios";
import md5 from "md5";

const lastfmKey = {
  api_key: "5df8d91bac81fb9ea65ca73b43ecec62",
  secret: "1186a5beaa848cba51f710c4685be2e9"
};
// zbedny komentarz
//    `http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${artist.artist}&api_key=${lastfmKey.api_key}&limit=15&format=json`

const lastfmApi = (method, options) => {
  // co tu sie dzieje?
  let request = `http://ws.audioscrobbler.com/2.0/?method=${method}`;
  Object.entries(options).forEach(([key, value]) => {
    request = `${request}&${key}=${value}`;
  });
  request = `${request}&api_key=${lastfmKey.api_key}&format=json`;
  return request;
};

export const loginAction = token => {
  const loginOptions = {
    token: `${token}`,
    // co to za md5??
    api_sig: md5(
      `api_key${lastfmKey.api_key}methodauth.getSessiontoken${token}${lastfmKey.secret}`
    )
  };

  return dispatch => {
    dispatch({
      type: "LOGIN_ATTEMPT"
    });
    // console.log
    console.log(`${lastfmApi("auth.getSession", loginOptions)}`);
    axios
      // co robi ta metoda?
      .get(`${lastfmApi("auth.getSession", loginOptions)}`)
      .then(function(response) {
        dispatch({
          type: "LOGIN_SUCCESS",
          apiSig: loginOptions.api_sig,
          sessionKey: response.data.session.key,
          username: response.data.session.name
        });
      })
      .catch(function(error) {
        console.log(error);
      });
    // zbędny komentarz
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
