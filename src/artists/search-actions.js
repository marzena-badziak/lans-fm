import { lastfmRequestURLMaker, lastfmKey } from "../lib/lastfm-api";
import axios from "axios";

export const searchArtist = artist => {
  const getsimilarOptions = {
    artist: artist.artist,
    limit: "50",
    api_key: lastfmKey.api_key,
    method: "artist.getsimilar"
  };

  return dispatch => {
    dispatch({
      type: "SEARCH_ARTIST_ATTEMPT",
      artistEntered: artist.artist
    });
    axios
      .get(`${lastfmRequestURLMaker(getsimilarOptions)}`)
      .then(function(response) {
        if (!response.data.similarartists || response.data.similarartists.artist.length === 0) {
          dispatch({
            type: "SEARCH_NO_ARTIST"
          });
        }  else {
          dispatch({
            type: "SEARCH_ARTIST_SUCCESS",
            artistsSimilar: response.data.similarartists.artist
              .reverse()
              .slice(0, 30)
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};
