import React, { Component } from "react";
import { connect } from "react-redux";
import { getAlbums } from "../artists/search-actions.js";
import AlbumTile from "./AlbumTile";
class AlbumsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetched: false
    };
  }
  fetchAlbums = e => {
    console.log("a");
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
    console.log(this.props);
    if (this.props.albums.albums.album) {
      return this.props.albums.albums.album.map(album => {
        return (
          <AlbumTile
            image={album.image[2]["#text"]}
            title={album.name}
            artist={album.artist.name}
          />
        );
      });
    } else {
      return <div>Searching albums ...</div>;
    }
  }
  render() {
    console.log(this.props);
    return (
      <div className="container">
        {this.renderTiles()}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    albums: state.albums
  };
};
export default connect(mapStateToProps)(AlbumsPage);
