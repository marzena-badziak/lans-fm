import React, { Component } from "react";
import { getAlbumInfo } from "./search-actions.js";
import { connect } from "react-redux";
import Paper from "material-ui/Paper";
import Avatar from "material-ui/Avatar";
import CircularProgress from "material-ui/CircularProgress";
import styled from "styled-components";
import { withRouter } from "react-router";
import { SpotifyIframe } from "./SpotifyIframe";
import Track from "./Track";
import { LansFmUtils, encodeURI, decodeURI } from "../lib/utils";
import { SpotifyLogic } from "../lib/spotify";
import Navigation from "../user-interface/Navigation";
import SpotifyLoginButton from "./SpotifyLoginButton";
import TrackList from "./TrackList";
import MediaQuery from "react-responsive";

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

  closeMenu = () => {
    this.setState({
      open: {}
    });
  };
  fetchAlbum = e => {
    this.props.dispatch(
      getAlbumInfo({
        artist: decodeURI(this.props.params.artistChosen),
        album: decodeURI(this.props.params.albumName)
      })
    );
  };
  componentDidMount() {
    this.fetchAlbum();
  }

  displaySpotify() {
    if (
      this.props.session.spotifyAccessToken &&
      this.props.session.spotifyExpiresIn > Date.now()
    ) {
      if (this.state.spotifyAlbumUri) {
        return (
          <div>
            <MediaQuery query="(min-width: 481px)">
              <SpotifyIframe
                spotifyUri={this.state.spotifyAlbumUri}
                title={this.state.spotifyUri}
                width="300px"
                height="300px"
                theme="white"
              />
            </MediaQuery>
            <MediaQuery query="(max-width: 480px)">
              <SpotifyIframe
                spotifyUri={this.state.spotifyAlbumUri}
                title={this.state.spotifyUri}
                width="260px"
                height="300px"
                theme="white"
              />
            </MediaQuery>
          </div>
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

  checkIfAlbumHasTracks() {
    if (this.props.album.album.tracks.track.length !== 0) {
      return this.props.album.album.tracks.track.map((track, i) => {
        return (
          <Track
            i={i}
            track={track}
            artist={decodeURI(this.props.params.artistChosen)}
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
  }
  albumNotFound() {
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
  showTracks() {
    if (this.props.album.message === "GOT_ALBUMS") {
      return this.checkIfAlbumHasTracks();
    } else {
      return this.albumNotFound();
    }
  }
  getAlbumImage(imageType) {
    return this.props.album.album.image[imageType]["#text"];
  }
  showAlbumInfo() {
    if (this.props.album.message === "GOT_ALBUMS") {
      return (
        <StyledTopContainer>
          <AlbumInfo style={{ margin: "10px 20px" }}>
            <Avatar src={this.getAlbumImage(2)} size={150} />
            <AlbumName>
              {decodeURI(this.props.params.albumName)}
            </AlbumName>
          </AlbumInfo>
          <SpotifyContainer>
            {this.displaySpotify()}
          </SpotifyContainer>
        </StyledTopContainer>
      );
    }
  }
  render() {
    return (
      <div>
        <Navigation
          artistName={this.props.params.artistName}
          artistChosen={this.props.params.artistChosen}
        />

        <Container className="container">
          <StyledPaperContainer>
            {this.showAlbumInfo()}
            <TrackList closeMenu={this.closeMenu} enableOnClickOutside={true}>
              {this.showTracks()}
            </TrackList>
          </StyledPaperContainer>
        </Container>
      </div>
    );
  }
}
const AlbumInfo = styled.div`margin: 10px 20px;`;
const SpotifyContainer = styled.div`margin: 10px;`;
const AlbumName = styled.h2`
  display: block;
  text-align: center;
`;
const StyledPaperContainer = styled(Paper)`
  width: 88vw;
  margin-top: 40px;
  paddingTop: 10px;
`;
const Container = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
`;
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
