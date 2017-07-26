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
import SpotifyLogic from "../lib/spotify";
import Navigation from "../user-interface/Navigation";
import FontAwesome from "react-fontawesome";
import SpotifyLoginButton from "./SpotifyLoginButton";

class AlbumPage extends Component {
  constructor(props) {
    super(props);

    let displaySpotifyLogin = LansFmUtils.verifySpotifyToken(
      this.props.session.spotifyAccessToken,
      this.props.session.spotifyExpiresIn
    );

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
      let spotifyAuthorizationUrl = this.props.dispatch({
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
    if (
      this.props.session.spotifyAccessToken &&
      this.props.session.spotifyExpiresIn > Date.now()
    ) {
      if (this.state.spotifyAlbumUri) {
        return (
          <SpotifyIframe
            spotifyUri={this.state.spotifyAlbumUri}
            title={this.state.spotifyUri}
            width="300"
            height="300"
            theme="white"
          />
        );
      } else {
        return (
          <SpotifyAlert>This album is not available on spotify</SpotifyAlert>
        );
      }
    } else {
      return (
        <SpotifyLoginButton
          spotifyStateString={this.spotifyStateString}
          redirectUrl={this.props.location.pathname}
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
              ? <StyledTopContainer>
                  <div style={{ margin: "10px 20px" }}>
                    <Avatar
                      src={this.props.album.album.image[2]["#text"]}
                      size={150}
                    />
                    <h2 style={{ display: "block", textAlign: "center" }}>
                      {this.replaceDashWithSpace(this.props.params.albumName)}
                    </h2>
                  </div>
                  <div style={{ margin: "10px" }}>
                    {this.displaySpotify()}
                  </div>
                </StyledTopContainer>
              : null}
            <List>
              {this.showTracks()}
            </List>
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
