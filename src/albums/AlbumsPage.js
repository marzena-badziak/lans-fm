import React, { Component } from "react";
import { connect } from "react-redux";
import { getAlbums, getArtistInfo } from "./search-actions.js";
import { searchArtist } from "../artists/search-actions.js";
import AlbumTile from "./AlbumTile";
import styled from "styled-components";
import Avatar from "material-ui/Avatar";
import CircularProgress from "material-ui/CircularProgress";
import { withRouter } from "react-router";
import { LansFmUtils } from "../lib/utils";
import FlatButton from "material-ui/FlatButton";
import Navigation from "../user-interface/Navigation";
import { SpotifyIframe } from "./SpotifyIframe";
import { SpotifyFollowIframe } from "./SpotifyFollowIframe";
import { SpotifyLogic } from "../lib/spotify";
import SpotifyLoginButton from "./SpotifyLoginButton";

class AlbumsPage extends Component {
  constructor(props) {
    super(props);

    let displaySpotifyLogin = LansFmUtils.verifySpotifyToken(
      this.props.session.spotifyAccessToken,
      this.props.session.spotifyExpiresIn
    );

    this.state = {
      spotifyArtistUri: "",
      displaySpotifyLogin: displaySpotifyLogin
    };
    this.spotifyLogic = new SpotifyLogic(
      this.props.session.spotifyAccessToken,
      this.setSpotifyArtistUri
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
      this.spotifyLogic.getSpotifyArtistUri(this.props.params.artistChosen);
    }
  }
  fetchAlbums = e => {
    this.props.dispatch(
      getAlbums({
        data: this.replaceDashWithSpace(this.props.params.artistChosen)
      })
    );
  };
  fetchArtist = e => {
    this.props.dispatch(
      getArtistInfo({
        artist: this.replaceDashWithSpace(this.props.params.artistChosen)
      })
    );
  };
  componentDidMount() {
    this.fetchAlbums();
    this.fetchArtist();
  }
  displayAvaliableAlbums(album, i) {
    if (!(album.name === "(null)")) {
      return (
        <AlbumTile
          key={i}
          image={album.image[2]["#text"]}
          title={album.name}
          artist={album.artist.name}
        />
      );
    }
  }
  mapAlbums() {
    return this.props.albums.albums.album.map((album, i) => {
      return this.displayAvaliableAlbums(album, i);
    });
  }
  displayPlaceHolder(placeholder) {
    return (
      <div>
        {placeholder}
      </div>
    );
  }
  renderTiles() {
    if (this.props.albums.albums.length !== 0) {
      return this.mapAlbums();
    } else {
      if (this.props.albums.message === "Searching") {
        return this.displayPlaceHolder(<CircularProgress color="#aa8899" />);
      } else {
        return this.displayPlaceHolder(this.props.albums.message);
      }
    }
  }
  replaceSpacesWithDashes(str) {
    return str.replace(/\s+/g, "-");
  }
  replaceDashWithSpace(str) {
    return str.replace(/-/g, " ");
  }

  goBackToSearchResults = e => {
    e.preventDefault();
    console.log("back to search");
    this.props.router.push(
      "/" + this.replaceSpacesWithDashes(this.props.params.artistName)
    );
  };
  fetchSimilarArtist = e => {
    this.props.dispatch(
      searchArtist({
        artist: this.props.params.artistChosen
      })
    );
    this.props.router.push(
      "/" + this.replaceSpacesWithDashes(this.props.params.artistChosen)
    );
  };

  showListeners = () => {
    if(this.props.artist.artist.stats) {
      return(
        <span>Listeners: {this.props.artist.artist.stats.listeners} </span>
      )
    } else {
        return;
    }
  }

  showPlaycount = () => {
    if(this.props.artist.artist.stats) {
      return(
        <span>Play count: {this.props.artist.artist.stats.playcount} </span>
      )
    } else {
        return;
    }
  }

  setSpotifyArtistUri = uri => {
    this.setState({ spotifyArtistUri: uri });
  };
  render() {
    return (
      <div>
        <Navigation artistName={this.props.params.artistName} />
        <div className="container">
          <FlatButton
            label="Search Similar"
            onClick={e => this.fetchSimilarArtist(e)}
            style={{ margin: "5px" }}
            backgroundColor="#7a3e5e"
            hoverColor="plum"
            style={{ position: "relative", float: "right" }}
            labelStyle={{
              fontSize: "12px",
              padding: "3px 5px"
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              margin: "10px",
              marginTop: "30px"
            }}
          >
            <Avatar
              src={
                this.props.artist.artist.image
                  ? this.props.artist.artist.image[2]["#text"]
                  : ""
              }
              alt={`${this.props.artist.artist.name} foto`}
              size={200}
              style={{ marginTop: "10px" }}
            />
            <h2 style={{ fontSize: "50px", marginLeft: "15px" }}>
              {this.props.artist.artist.name}
            </h2>
            <div>{this.showListeners()}</div>
            <div>{this.showPlaycount()}</div>

            {this.state.displaySpotifyLogin
              ? <SpotifyLoginButton
                  spotifyStateString={this.spotifyStateString}
                  redirectUrl={this.props.location.pathname}
                />
              : this.state.spotifyArtistUri
                ? <div>
                    <SpotifyFollowIframe
                      spotifyUri={this.state.spotifyArtistUri}
                      title={this.state.spotifyArtistUri}
                      width="200px"
                      height="30px"
                    />
                    <SpotifyIframe
                      spotifyUri={this.state.spotifyArtistUri}
                      title={this.state.spotifyArtistUri}
                      width="300"
                      height="300"
                    />
                  </div>
                : null}
          </div>

          <h3 style={{ display: "block", margin: "0" }}>Albums:</h3>

          <SearchResultsContainer
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "flex-start",
              alignContent: "flex-start",
              margin: "0 auto"
            }}
          >
            {this.renderTiles()}
          </SearchResultsContainer>
        </div>
      </div>
    );
  }
}
const SearchResultsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
  align-content: flex-start;
  float: none;
  margin: 0 auto;
  padding: 20px 0;
`;
const mapStateToProps = state => {
  return {
    results: state.similarArtists.artistsSimilar,
    albums: state.albums,
    artist: state.artist,
    session: state.session
  };
};
export default connect(mapStateToProps)(withRouter(AlbumsPage));
