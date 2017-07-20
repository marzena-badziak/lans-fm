import React from "react";
import { connect } from "react-redux";
import { lastfmApi, lastfmKey } from "../lib/lastfm-api";
import { hashHistory } from "react-router";
import axios from "axios";
import md5 from "md5";

export const loginAction = token => {
  console.log("token: " + token);
  console.log("key: " + lastfmKey.api_key);
  console.log("secret: " + lastfmKey.secret);

  const loginOptions = {
    token: `${token}`,
    api_sig: md5(
      `api_key${lastfmKey.api_key}methodauth.getSessiontoken${token}${lastfmKey.secret}`
    )
  };

  return dispatch => {
    dispatch({
      type: "LOGIN_ATTEMPT"
    });
    console.log(`${lastfmApi("auth.getSession", loginOptions)}`);
    console.log(token);
    axios
      .get(`${lastfmApi("auth.getSession", loginOptions)}`)
      .then(function(response) {
        dispatch({
          type: "LOGIN_SUCCESS",
          apiSig: loginOptions.api_sig,
          sessionKey: response.data.session.key,
          username: response.data.session.name,
          token: loginOptions.token
        });
        console.log(loginOptions.token);
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
