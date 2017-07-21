import React, { Component } from "react";
import { getAlbumInfo } from "./search-actions.js";
import { connect } from "react-redux";
import { List } from "material-ui/List";
import Paper from "material-ui/Paper";
import Avatar from "material-ui/Avatar";
import CircularProgress from "material-ui/CircularProgress";
import FlatButton from "material-ui/FlatButton";
import FontAwesome from "react-fontawesome";
import styled from "styled-components";
import Divider from "material-ui/Divider";
import moment from "moment";
import { withRouter } from "react-router";
import { scrobbleAlbum } from "./scrobble-album";
import { SpotifyIframe } from "./SpotifyIframe";
import axios from "axios";
import Track from "./Track";

class AlbumPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spotifyAlbumUrl: "",
      spotifyAlbumFetched: false,

      open: {},
      left: {},
      top: {}
    };
    var headers = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + this.props.session.spotifyAccessToken
      }
    };
    console.log(this.props.params.albumName);
    axios
      .get(
        "https://api.spotify.com/v1/search?q=album:" +
          this.props.params.albumName +
          " artist:" +
          this.props.params.artistChoosen +
          "&type=album",
        headers
      )
      .then(response => {
        console.log(response);
        console.log(response.data.albums.items[0].uri);
        var url =
          "https://open.spotify.com/embed?uri=" +
          response.data.albums.items[0].uri;
        this.setState({ spotifyAlbumUrl: url }, () =>
          this.setState({ spotifyAlbumFetched: true })
        );
        console.log(this.state.spotifyAlbumUrl);
        console.log("flag: " + this.state.spotifyAlbumFetched);
      })
      .catch(err => {
        console.log(err);
      });
  }

  openMenu = (i, left, top) => {
    if (this.state.open[`${i}`] === "block") {
      this.setState({
        open: {}
      });
    } else {
      this.setState({
        open: {}
      });
      this.setState({
        open: { [`${i}`]: "block" },
        left: { [`${i}`]: left },
        top: { [`${i}`]: top }
      });
    }
  };

  closeMenu = i => {
    this.setState({
      open: { [`${i}`]: "none" }
    });
  };

  fetchAlbum = e => {
    this.props.dispatch(
      getAlbumInfo({
        artist: this.props.params.artistChoosen,
        album: this.props.params.albumName
      })
    );
  };
  componentDidMount() {
    this.fetchAlbum();
  }

  showTracks() {
    if (this.props.album.message === "GOT_ALBUMS") {
      if (this.props.album.album.tracks.track.length !== 0) {
        return this.props.album.album.tracks.track.map((track, i) => {
          return (
            <Track
              i={i}
              track={track}
              artist={this.props.params.artistChoosen}
              open={this.state.open[`${i}`] || "none"}
              left={this.state.left[`${i}`] || 0}
              top={this.state.top[`${i}`] || 0}
              openMenu={this.openMenu}
              closeMenu={this.closeMenu}
            />
          );
        });
      } else {
        return <div>Sorry tracks are not available for this album</div>;
      }
    } else {
      return <CircularProgress />;
    }
  }
  goBackToSearchResults = e => {
    e.preventDefault();
    console.log("back to search");
    this.props.router.push(this.props.params.artistName);
  };
  goBackToArtistPage = e => {
    e.preventDefault();
    this.props.router.push(
      `${this.props.params.artistName}/${this.props.params.artistChoosen}`
    );
  };

  render() {
    return (
      <div>
        <div
          style={{
            position: "absolute",
            left: "0",
            display: "block",
            margin: "10px"
          }}
        >
          <ul
            style={{
              display: "inline-block",
              listStyleType: "none",
              margin: "2px",
              padding: "0",
              color: "#aa8899",
              fontWeight: "bold"
            }}
          >
            <li
              style={{
                display: "inline",
                margin: "0 auto",
                marginTop: "10px",
                cursor: "pointer"
              }}
              onClick={this.goBackToSearchResults}
            >
              {" "}/ Search results: {this.props.params.artistName}{" "}
            </li>
            <li
              style={{
                display: "inline",
                margin: "0 auto",
                marginTop: "10px",
                cursor: "pointer"
              }}
              onClick={this.goBackToArtistPage}
            >
              / {this.props.params.artistChoosen}
            </li>
          </ul>
        </div>
        <div
          className="container"
          style={{
            display: "flex",
            // flexDirection: "column",
            justifyContent: "center"
            // flexWrap: "nowrap"
          }}
        >
          <Paper
            style={{ width: "80vw", marginTop: "40px", paddingTop: "10px" }}
          >
            {this.props.album.message === "GOT_ALBUMS"
              ? <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-between"
                  }}
                >
                  <div>
                    <Avatar
                      src={this.props.album.album.image[2]["#text"]}
                      size={150}
                    />
                    <h2 style={{ display: "block", textAlign: "center" }}>
                      {this.props.params.albumName}
                    </h2>
                    <FlatButton
                      label="Login to Spotify"
                      onClick={e => this.setSpotifyId(e)}
                      style={{ margin: "15px" }}
                      backgroundColor="darkgrey"
                      hoverColor="grey"
                      href="https://accounts.spotify.com/authorize?client_id=7cd65f9a6005482cb3830530b1e52b16&response_type=token&redirect_uri=http://localhost:3000/loginSpotify/"
                    />
                  </div>
                  <div>
                    {this.state.spotifyAlbumFetched
                      ? <SpotifyIframe
                          spotifyAlbumUrl={this.state.spotifyAlbumUrl}
                        />
                      : null}
                  </div>
                </div>
              : false}
            <List>
              {this.showTracks()}
            </List>
          </Paper>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    album: state.album,
    session: state.session
  };
};
export default connect(mapStateToProps)(withRouter(AlbumPage));
