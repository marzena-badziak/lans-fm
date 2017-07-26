import axios from "axios";
// import { connect } from "react-redux";

class SpotifyLogic {
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
          albumName +
          " artist:" +
          artistChosen +
          "&type=album",
        this.headers
      )
      .then(response => {
        let uri = response.data.albums.items[0].uri;
        this.setSpotifyUrlCallback(uri);
      })
      .catch(err => {
        console.log(err);
        this.setSpotifyUrlCallback("");
      });
  };

  getSpotifyArtistUri = artistChosen => {
    axios
      .get(
        "https://api.spotify.com/v1/search?q=artist:" +
          artistChosen +
          "&type=artist",
        this.headers
      )
      .then(response => {
        let artistUri = response.data.artists.items[0].uri;
        this.setSpotifyUrlCallback(artistUri);
      });
  };
}
export default SpotifyLogic;
