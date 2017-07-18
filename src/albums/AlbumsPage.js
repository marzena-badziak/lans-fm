import React, { Component } from "react";
import { connect } from "react-redux";
import { getAlbums } from "../artists/search-actions.js";
import AlbumTile from "./AlbumTile";
import styled from "styled-components";
import Avatar from "material-ui/Avatar";
import CircularProgress from "material-ui/CircularProgress";

class AlbumsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetched: false
    };
  }
  fetchAlbums = e => {
    this.props.dispatch(
      getAlbums({
        data: this.props.params.AritstName
      })
    );
  };
  componentDidMount() {
    this.fetchAlbums();
    this.setState({
      fetched: true
    });
  }
  renderTiles() {
    if (this.props.albums.albums.length !== 0) {
      return this.props.albums.albums.album.map((album, i) => {
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
      });
    } else {
      if (this.props.albums.message == "Searching") {
        return (
          <div>
            <CircularProgress />
          </div>
        );
      } else {
        return (
          <div>
            {" "}{this.props.albums.message}
          </div>
        );
      }
    }
  }
  artistImageCheck = () => {
    if (
      this.props.results.filter(
        artist => artist.name === this.props.params.AritstName
      )[0]
    ) {
      return this.props.results.filter(
        artist => artist.name === this.props.params.AritstName
      )[0].image[2]["#text"];
    }
  };
  render() {
    return (
      <div className="container">
        <h2>
          {this.props.params.AritstName}
        </h2>
        <Avatar
          src={this.artistImageCheck()}
          alt={`${this.props.params.AritstName} foto`}
          size={200}
        />
        <SearchResultsContainer>
          {this.renderTiles()}
        </SearchResultsContainer>
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
  console.log (state.albums);
  return {
    results: state.search.artistsSimilar,
    albums: state.albums,
    message: state.message
  };
};
export default connect(mapStateToProps)(AlbumsPage);
