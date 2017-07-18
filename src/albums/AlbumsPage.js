import React, { Component } from "react";
import { connect } from "react-redux";
import { getAlbums } from "../artists/search-actions.js";
import AlbumTile from "./AlbumTile";
import styled from "styled-components";
import qs from 'qs';
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
        data: this.props.params.AritstN
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
    if (this.props.albums.albums.album) {
      let scrobbleRequest = "";
      return this.props.albums.albums.album.map((album, i) => {
        if (!(album.name == "(null)")) {
          scrobbleRequest += `&track[${i}]=${track.name}&artist[${i}]=${track.artist.name}&timestamp[${i}]=&mbid[${i}]=${track.mbid}`;
          return (
            <AlbumTile
              key={i}1
              image={album.image[2]["#text"]}
              title={album.name}
              artist={album.artist.name}
            />
          );
        }
      });
    } else {
      return (
        <div>
          <CircularProgress />
        </div>
      );
    }
  }
  artistImageCheck = () => {
    if (
      this.props.results.filter(
        artist => artist.name == this.props.params.AritstName
      )[0]
    ) {
      return this.props.results.filter(
        artist => artist.name == this.props.params.AritstName
      )[0].image[2]["#text"];
    }
  };
  render() {

    /*for(var i = 0; i < this.props.albums.albums.album.lenght;  i++){
      scrobbleRequest += this.props.albums.albums.album[i].artist;
    }*/
    const picked = _.without(this.props.albums.albums)
    console.log(picked);
    console.log(qs.stringify(picked))
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
    albums: state.albums
  };
};
export default connect(mapStateToProps)(AlbumsPage);
