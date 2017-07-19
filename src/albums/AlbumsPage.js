import React, { Component } from "react";
import { connect } from "react-redux";
import { getAlbums } from "../artists/search-actions.js";
import AlbumTile from "./AlbumTile";
import styled from "styled-components";
import qs from "qs";
import Avatar from "material-ui/Avatar";
import CircularProgress from "material-ui/CircularProgress";
import { withRouter } from "react-router";

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
  componentDidMount() {
    this.fetchAlbums();
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
  artistImageCheck = () => {
    const artistImg = this.props.results.find(
      artist => artist.name == this.props.params.artistName
    );
    console.log(artistImg);
    if (artistImg) {
      return artistImg.image[2]["#text"];
    }
  };
  goBackToSearchResults = e => {
    e.preventDefault();
    console.log("back to search");
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
          <h2>
            {this.props.params.artistName}
          </h2>
          <Avatar
            src={this.artistImageCheck()}
            alt={`${this.props.params.artistName} foto`}
            size={200}
          />
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
  justify-content: space-between;
  align-items: flex-start;
  align-content: flex-start;
  float: none;
  margin: 0 auto;
  padding: 20px 0;
`;
const mapStateToProps = state => {
  console.log(state.albums);
  return {
    results: state.search.artistsSimilar,
    albums: state.albums,
    message: state.message
  };
};
export default connect(mapStateToProps)(withRouter(AlbumsPage));
