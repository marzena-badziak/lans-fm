import axios from "axios";
import { decodeURI } from "./utils";

export class SpotifyLogic {
  constructor(spotifyAccessToken, setSpotifyUrlCallback) {
    this.setSpotifyUrlCallback = setSpotifyUrlCallback;
    this.spotifyAccessToken = spotifyAccessToken;
    this.headers = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + this.spotifyAccessToken
      }
    };
  }

  getSpotifyAlbumUri = (albumName, artistChosen) => {
    axios
      .get(
        "https://api.spotify.com/v1/search?q=album:" +
          encodeURIComponent(decodeURI(albumName)) +
          " artist:" +
          encodeURIComponent(decodeURI(artistChosen)) +
          "&type=album",
        this.headers
      )
      .then(response => {
        if (response.data.albums.items.length !== 0) {
          let uri = response.data.albums.items[0].uri;
          this.setSpotifyUrlCallback(uri);
        }
      })
      .catch(err => {
        this.setSpotifyUrlCallback("");
      });
  };

  getSpotifyArtistUri = artistChosen => {
    axios
      .get(
        "https://api.spotify.com/v1/search?q=artist:" +
          encodeURIComponent(decodeURI(artistChosen)) +
          "&type=artist",
        this.headers
      )
      .then(response => {
        if(response.data.artists.items.length !== 0) {
          let artistUri = response.data.artists.items[0].uri;
          this.setSpotifyUrlCallback(artistUri);
        }
        let artistUri = response.data.artists.items[0].uri;
        this.setSpotifyUrlCallback(artistUri);
      });
  };
}
