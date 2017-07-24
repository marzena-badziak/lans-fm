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
import Naviagion from "../user-interface/Navigation";

class AlbumsPage extends Component {
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
        return this.displayPlaceHolder(<CircularProgress />);
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
  render() {
    return (
      <div>
        <Naviagion artistName={this.props.params.artistName} />
        <div className="container">
          <div
            style={{
              display: "flex",
              // flexDirection: "row",
              // flexWrap: "wrap",
              justifyContent: "flex-start",
              alignItems: "flex-end",
              alignContent: "flex-start",
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
    artist: state.artist
  };
};
export default connect(mapStateToProps)(withRouter(AlbumsPage));
