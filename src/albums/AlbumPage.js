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

import Navigation from "../user-interface/Navigation";
import FontAwesome from "react-fontawesome";
import SpotifyLoginButton from "./SpotifyLoginButton";
import TrackList from "./TrackList";
import { SpotifyLogic } from "../lib/spotify";

class AlbumPage extends Component {
  constructor(props) {
    super(props);

    let displaySpotifyLogin =
      this.props.session.spotifyAccessToken === "" ||
      (this.props.session.spotifyExpiresIn !== "" &&
        this.props.session.spotifyExpiresIn < Date.now())
        ? true
        : false;

    this.state = {
      spotifyAlbumUri: "",
      displaySpotifyLogin: displaySpotifyLogin,
      open: {},
      left: {},
      top: {}
    };

    this.spotifyLogic = new SpotifyLogic(
      this.props.session.spotifyAccessToken,
      this.setSpotifyAlbumUri
    );

    if (displaySpotifyLogin) {
      let stateString = LansFmUtils.randomString(32);
      this.spotifyStateString = stateString;
      let spotifyAuthorizationUri = this.props.dispatch({
        type: "SPOTIFY_GENERATE_STATE",
        spotifyStateString: stateString
      });
    }
    if (!displaySpotifyLogin) {
      this.spotifyLogic.getSpotifyAlbumUri(
        this.props.params.albumName,
        this.props.params.artistChosen
      );
    }
  }
  setSpotifyAlbumUri = uri => {
    this.setState({ spotifyAlbumUri: uri });
  };

  saveCurrentPath = e => {
    this.props.dispatch({
      type: "SAVE_CURRENT_PATH",
      currentPath: this.props.location.pathname
    });
  };

  openMenu = (i, left, top, close = false) => {
    if (close) {
      this.setState({
        open: {}
      });
    }
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
        artist: this.replaceDashWithSpace(this.props.params.artistChosen),
        album: this.replaceDashWithSpace(this.props.params.albumName)
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
  displaySpotify() {
    if (this.props.session.spotifyAccessToken) {
      if (this.state.spotifyAlbumUri) {
        return (
          <SpotifyIframe
            spotifyUri={this.state.spotifyAlbumUri}
            title={this.state.spotifyAlbumUri}
          />
        );
      } else {
        return (
          <SpotifyAlert>This album is not available on spotify</SpotifyAlert>
        );
      }
    } else {
      return (
        <StyledFlatButton
          label="Quick listen on Spotify"
          labelStyle={{
            fontSize: "12px",
            padding: "3px 5px"
          }}
          onClick={e => this.saveCurrentPath(e)}
          backgroundColor="#1db954"
          hoverColor="#4bdf80"
          icon={
            <FontAwesome
              className="fa fa-spotify"
              name="options"
              size="lg"
              aria-hidden="true"
            />
          }
          href={
            "https://accounts.spotify.com/authorize?client_id=7cd65f9a6005482cb3830530b1e52b16&response_type=token&redirect_uri=http://localhost:3000/loginSpotify/&state=" +
            this.spotifyStateString
          }
        />
      );
    }
  }
  showTracks() {
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
        return (
          <LastFMAlert>
            Sorry tracks no tracks in last-fm database for this album
          </LastFMAlert>
        );
      }
    } else {
      if (this.props.album.message === "no_album") {
        return (
          <AlbumNotFundAlert>
            Album not found in last-fm database
          </AlbumNotFundAlert>
        );
      } else {
        return <CircularProgress color="#aa8899" />;
      }
    }
  }
  goBackToSearchResults = e => {
    e.preventDefault();
    this.props.router.push(this.props.params.artistName);
  };
  goBackToArtistPage = e => {
    e.preventDefault();
    this.props.router.push(
      `${this.props.params.artistName}/${this.props.params.artistChosen}`
    );
  };

  render() {
    return (
      <div>
        <Navigation
          artistName={this.props.params.artistName}
          artistChosen={this.props.params.artistChosen}
        />
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "column"
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
                    {this.state.spotifyAlbumUri !== ""
                      ? <SpotifyIframe
                          spotifyUri={this.state.spotifyAlbumUri}
                          title={this.state.spotifyAlbumUri}
                        />
                      : null}
                  </div>
                </div>
              : null}
            <TrackList openMenu={this.openMenu} enableOnClickOutside={true}>
              {this.showTracks()}
            </TrackList>
          </Paper>
        </div>
      </div>
    );
  }
}
const StyledTopContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  justify-content: space-between;
`;

const StyledFlatButton = styled(FlatButton)`
  color:black;
  margin: 5px;
`;
const SpotifyAlert = styled.div`
  margin-right: 50px;
  margin-top: 20px;
`;
const AlbumNotFundAlert = styled.div`padding: 35px;`;
const LastFMAlert = styled.div`padding: 35px;`;

const mapStateToProps = state => {
  return {
    album: state.album,
    session: state.session
  };
};
export default connect(mapStateToProps)(withRouter(AlbumPage));
