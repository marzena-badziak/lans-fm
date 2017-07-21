import { lastfmApi, lastfmKey } from "../lib/lastfm-api";

import axios from "axios";
import md5 from "md5";

export const loginAction = token => {
  const loginOptions = {
    token: `${token}`,
    api_sig: md5(
      `api_key${lastfmKey.api_key}methodauth.getSessiontoken${token}${lastfmKey.secret}`
    )
  };

  return dispatch => {
    axios
      .get(`${lastfmApi("auth.getSession", loginOptions)}`)
      .then(function(response) {
        console.log(response);
        dispatch({
          type: "LOGIN_SUCCESS",
          apiSig: loginOptions.api_sig,
          sessionKey: response.data.session.key,
          username: response.data.session.name,
          token: loginOptions.token
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};
