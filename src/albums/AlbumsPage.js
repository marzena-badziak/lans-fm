import React, { Component } from "react";
import { connect } from "react-redux";
import { getAlbums, getArtistInfo } from "./search-actions.js";
import { searchArtist } from "../artists/search-actions.js";
import AlbumTile from "./AlbumTile";
import styled from "styled-components";
import Avatar from "material-ui/Avatar";
import CircularProgress from "material-ui/CircularProgress";
import { withRouter } from "react-router";
import FlatButton from "material-ui/FlatButton";
import Navigation from "../user-interface/Navigation";
import { SpotifyIframe } from "./SpotifyIframe";
import { SpotifyFollowIframe } from "./SpotifyFollowIframe";
import { SpotifyLogic } from "../lib/spotify";
import SpotifyLoginButton from "./SpotifyLoginButton";
import { LansFmUtils, encodeURI, decodeURI } from "../lib/utils";

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
        data: decodeURI(this.props.params.artistChosen)
      })
    );
  };
  fetchArtist = e => {
    this.props.dispatch(
      getArtistInfo({
        artist: decodeURI(this.props.params.artistChosen)
      })
    );
  };
  componentDidMount() {
    this.fetchAlbums();
    this.fetchArtist();
  }
  displayAvaliableAlbums = (album, i) => {
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
  };
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
  fetchSimilarArtist = e => {
    this.props.dispatch(
      searchArtist({
        artist: this.props.params.artistChosen
      })
    );
    this.props.router.push("/" + encodeURI(this.props.params.artistChosen));
  };

  addSpaces = number => {
    let remainder = number.length % 3;
    return (number.substr(0, remainder) +
      number.substr(remainder).replace(/(\d{3})/g, " $1")).trim();
  };

  showStats = () => {
    if (this.props.artist.artist.stats) {
      return (
        <div>
          <ArtistStat>
            <strong>Listeners:</strong>{" "}
            {this.addSpaces(this.props.artist.artist.stats.listeners)}{" "}
          </ArtistStat>
          <ArtistStat>
            <strong>Playcount:</strong>{" "}
            {this.addSpaces(this.props.artist.artist.stats.playcount)}{" "}
          </ArtistStat>
        </div>
      );
    } else {
      return;
    }
  };
  getImage(imageSize) {
    return this.props.artist.artist.image[imageSize]["#text"];
  }
  setImage() {
    if (this.props.artist.artist.image) {
      return this.getImage(2);
    }
  }
  setSpotifyArtistUri = uri => {
    this.setState({ spotifyArtistUri: uri });
  };

  showSpotify() {
    if (this.state.displaySpotifyLogin) {
      return (
        <SpotifyLoginButton
          spotifyStateString={this.spotifyStateString}
          redirectUrl={this.props.location.pathname}
        />
      );
    } else {
      if (this.state.spotifyArtistUri) {
        return (
          <SpotifyContainer>
            <SpotifyIframe
              spotifyUri={this.state.spotifyArtistUri}
              title={this.state.spotifyArtistUri}
              height="300px"
            />
            <SpotifyFollowIframe
              spotifyUri={this.state.spotifyArtistUri}
              title={this.state.spotifyArtistUri}
              width="145px"
              height="30px"
            />
          </SpotifyContainer>
        );
      }
    }
  }

  render() {
    return (
      <div>
        <Navigation artistName={this.props.params.artistName} />
        <div className="container">
          <Container>
            <AtristInfoContainer>
              <Avatar
                src={this.setImage()}
                alt={`${this.props.artist.artist.name} foto`}
                size={200}
                style={{ marginTop: "10px" }}
              />
            </AtristInfoContainer>
            <StatsContainer>
              <ArtistName>
                {this.props.artist.artist.name}
              </ArtistName>
              {this.showStats()}
              <SearchSimilarButton
                label="Search Similar"
                onClick={e => this.fetchSimilarArtist(e)}
                backgroundColor="#7a3e5e"
                hoverColor="plum"
                labelStyle={{
                  fontSize: "12px",
                  padding: "3px 5px",
                  color: "white"
                }}
              />
            </StatsContainer>
            {this.showSpotify()}
          </Container>
          <SearchResultsContainer>
            {this.renderTiles()}
          </SearchResultsContainer>
        </div>
      </div>
    );
  }
}
const ArtistStat = styled.div`margin-bottom: 5px;`;
const SpotifyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const AtristInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const AlbumsHeader = styled.h3`
  display: block;
  margin: 0;
`;
const ArtistName = styled.h2`font-size: 50px;`;
const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 25px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  margin: 10px;
  margin-top: 30px;
`;
const SearchSimilarButton = styled(FlatButton)`
  margin-top: 15px;
`;
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
