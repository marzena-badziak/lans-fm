import axios from "axios";

export class SpotifyLogic {
  constructor(spotifyAccessToken, setSpotifyAlbumUrlCallback) {
    this.setSpotifyAlbumUrlCallback = setSpotifyAlbumUrlCallback;
    this.spotifyAccessToken = spotifyAccessToken;
  }

  getSpotifyAlbumId = (albumName, artistChosen) => {
    var headers = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + this.spotifyAccessToken
      }
    };
    console.log(albumName);
    axios
      .get(
        "https://api.spotify.com/v1/search?q=album:" +
          albumName +
          " artist:" +
          artistChosen +
          "&type=album",
        headers
      )
      .then(response => {
        console.log(response);
        console.log(response.data.albums.items[0].uri);
        var url =
          "https://open.spotify.com/embed?uri=" +
          response.data.albums.items[0].uri;

        this.setSpotifyAlbumUrlCallback(url);
      })
      .catch(err => {
        console.log(err);
        this.setSpotifyAlbumUrlCallback("");
      });
  };
}
