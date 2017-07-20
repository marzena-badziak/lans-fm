import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAlbums,
  getArtistInfo,
  searchArtist
} from "../artists/search-actions.js";
import AlbumTile from "./AlbumTile";
import styled from "styled-components";
import qs from "qs";
import Avatar from "material-ui/Avatar";
import CircularProgress from "material-ui/CircularProgress";
import { withRouter } from "react-router";
import FlatButton from "material-ui/FlatButton";

class AlbumsPage extends Component {
  constructor(props) {
    super(props);
  }
  fetchAlbums = e => {
    this.props.dispatch(
      getAlbums({
        data: this.props.params.artistName
      })
    );
  };
  fetchArtist = e => {
    this.props.dispatch(
      getArtistInfo({
        artist: this.props.params.artistName
      })
    );
  };
  componentDidMount() {
    this.fetchAlbums();
    this.fetchArtist();
  }
  displayAvaliableAlbums(album, i) {
    if (!(album.name == "(null)")) {
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
      if (this.props.albums.message == "Searching") {
        return this.displayPlaceHolder(<CircularProgress />);
      } else {
        return this.displayPlaceHolder(this.props.albums.message);
      }
    }
  }

  goBackToSearchResults = e => {
    e.preventDefault();
    console.log("back to search");
    this.props.router.push("searchResults");
  };
  fetchSimilarArtist = e => {
    this.props.dispatch(
      searchArtist({
        artist: this.props.params.artistName
      })
    );
    this.props.router.push("searchResults");
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
              padding: "0"
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
              / search results
            </li>
          </ul>
        </div>

        <div className="container">
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <Avatar
              src={
                this.props.artist.artist.image
                  ? this.props.artist.artist.image[2]["#text"]
                  : false
              }
              alt={`${this.props.artist.artist.name} foto`}
              size={200}
              style={{ marginTop: "40px" }}
            />
            <h2 style={{ fontSize: "50px" }}>
              {this.props.artist.artist.name}
            </h2>
            <FlatButton
              label="Search Similar"
              onClick={e => this.fetchSimilarArtist(e)}
              style={{ margin: "15px" }}
              backgroundColor="darkgrey"
              hoverColor="grey"
            />
          </div>

          <SearchResultsContainer>
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
    results: state.search.artistsSimilar,
    albums: state.albums,
    artist: state.artist
  };
};
export default connect(mapStateToProps)(withRouter(AlbumsPage));
