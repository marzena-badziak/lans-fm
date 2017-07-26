// jakos duzo tych importow tu
import React, { Component } from "react";
import { getAlbumInfo } from "./search-actions.js";
import { connect } from "react-redux";
import { List } from "material-ui/List";
import Paper from "material-ui/Paper";
import Avatar from "material-ui/Avatar";
import CircularProgress from "material-ui/CircularProgress";
import FlatButton from "material-ui/FlatButton";
import styled from "styled-components";
import Divider from "material-ui/Divider";
import moment from "moment";
import { withRouter } from "react-router";
import { scrobbleAlbum } from "./scrobble-album";
import { SpotifyIframe } from "./SpotifyIframe";
import axios from "axios";
import Track from "./Track";
import { LansFmUtils } from "../lib/utils";
// niepotrzebna przerwa

import Navigation from "../user-interface/Navigation";
import FontAwesome from "react-fontawesome";
import SpotifyLoginButton from "./SpotifyLoginButton";
import TrackList from "./TrackList";
import { SpotifyLogic } from "../lib/spotify";

class AlbumPage extends Component {
  constructor(props) {
    super(props);

    let displaySpotifyLogin =
      // to moznaby zapisac jako metode
      this.props.session.spotifyAccessToken === "" ||
      (this.props.session.spotifyExpiresIn !== "" &&
        this.props.session.spotifyExpiresIn < Date.now())
        ? true
        : false;

    this.state = {
      spotifyAlbumUrl: "",
      displaySpotifyLogin: displaySpotifyLogin,
      open: {},
      left: {},
      top: {},
    };

    this.spotifyLogic = new SpotifyLogic(
      this.props.session.spotifyAccessToken,
      this.setSpotifyAlbumUrl
    );

    if (displaySpotifyLogin) {
      let stateString = LansFmUtils.randomString(32);
      this.spotifyStateString = stateString;
      let spotifyAuthorizationUrl = this.props.dispatch({
        type: "SPOTIFY_GENERATE_STATE",
        spotifyStateString: stateString,
      });
    }
    // co tu sie dzieje?
    // nie jestesmy zalogowani w spotify wiec pobieramy album ze spotify?
    if (!displaySpotifyLogin) {
      this.spotifyLogic.getSpotifyAlbumId(
        this.props.params.albumName,
        this.props.params.artistChosen
      );
    }
  }
  setSpotifyAlbumUrl = url => {
    this.setState({ spotifyAlbumUrl: url });
  };

  // dziwne jakies parametry tu macie
  openMenu = (i, left, top, close = false) => {
    // czym rozni sie
    // if (close) {
    // od
    // if (this.state.open[`${i}`] === "block") {
    if (close) {
      this.setState({
        open: {},
      });
    }
    if (this.state.open[`${i}`] === "block") {
      this.setState({
        open: {},
      });
    } else {
      // najpierw ustawiamy jeden stan z pustym obiektem a potem nadpisujemy to?
      this.setState({
        open: {},
      });
      this.setState({
        open: { [`${i}`]: "block" },
        left: { [`${i}`]: left },
        top: { [`${i}`]: top },
      });
    }
  };

  closeMenu = i => {
    this.setState({
      open: { [`${i}`]: "none" },
    });
  };
  fetchAlbum = e => {
    this.props.dispatch(
      getAlbumInfo({
        artist: this.replaceDashWithSpace(this.props.params.artistChosen),
        album: this.replaceDashWithSpace(this.props.params.albumName),
      })
    );
  };
  componentDidMount() {
    this.fetchAlbum();
  }
  replaceSpacesWithDashes(str) {
    return str.replace(/\s+/g, "-");
  }
  replaceDashWithSpace(str) {
    return str.replace(/-/g, " ");
  }
  showTracks() {
    // co to za warunkowy mutant? :O
    if (this.props.album.message === "GOT_ALBUMS") {
      if (this.props.album.album.tracks.track.length !== 0) {
        return this.props.album.album.tracks.track.map((track, i) => {
          return (
            <Track
              i={i}
              track={track}
              artist={this.replaceDashWithSpace(this.props.params.artistChosen)}
              open={this.state.open[`${i}`] || "none"}
              left={this.state.left[`${i}`] || 0}
              top={this.state.top[`${i}`] || 0}
              openMenu={this.openMenu}
              closeMenu={this.closeMenu}
              disableOnClickOutside={true}
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
  render() {
    return (
      <div>
        <div
          className="container"
          {/* inline style */}
          style={{
            display: "flex",
            {/* zbedny komentarz  */}
            // flexDirection: "column",
            justifyContent: "center",
            {/* zbedny komentarz  */}
            // flexWrap: "nowrap"
          }}>
          <Paper
            {/* inline style */}
            style={{ width: "80vw", marginTop: "40px", paddingTop: "10px" }}>
            {/* to musi wyjechac do funkcji albo komponentu innego */}
            {this.props.album.message === "GOT_ALBUMS"
              ? <div
                  {/* inline style */}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                  }}>
                  <div>
                    <Avatar
                      {/* wyciagniecie tego obrazka powinno byc w innej funkcji */}
                      src={this.props.album.album.image[2]["#text"]}
                      size={150}
                    />
                    {/* inline style */}
                    <h2 style={{ display: "block", textAlign: "center" }}>
                      {this.replaceDashWithSpace(this.props.params.albumName)}
                    </h2>
                    <div>
                      {this.state.displaySpotifyLogin
                        ? <FlatButton
                            label="Login to Spotify"
                            onClick={e => this.setSpotifyId(e)}
                            style={{ margin: "15px" }}
                            backgroundColor="darkgrey"
                            hoverColor="grey"
                            href={
                              "https://accounts.spotify.com/authorize?client_id=7cd65f9a6005482cb3830530b1e52b16&response_type=token&redirect_uri=http://localhost:3000/loginSpotify/&state=" +
                              this.spotifyStateString
                            }
                          />
                        : null}
                    </div>
                  </div>
                  <div>
                    {this.state.spotifyAlbumUrl !== ""
                      ? <SpotifyIframe
                          spotifyAlbumUrl={this.state.spotifyAlbumUrl}
                          title={this.state.spotifyAlbumUrl}
                        />
                      : null}
                  </div>
                </div>
              : false}
            <TrackList openMenu={this.openMenu} enableOnClickOutside={true}>
              {this.showTracks()}
            </TrackList>
          </Paper>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    album: state.album,
    session: state.session,
  };
};
export default connect(mapStateToProps)(withRouter(AlbumPage));
