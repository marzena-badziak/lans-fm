import React, { Component } from "react";
import { getAlbumInfo } from "../artists/search-actions.js";
import { connect } from "react-redux";

class AlbumPage extends Component {
  fetchAlbum = e => {
    this.props.dispatch(
      getAlbumInfo({
        artist: this.props.params.AritstName,
        album: this.props.params.albumName
      })
    );
  };
  componentDidMount() {
    this.fetchAlbum();
  }
  render() {
    return (
      <div>
        {console.log(this.props.params)}
        {this.props.params.AritstName}
        {this.props.params.albumName}
        {console.log(this.props.album)}
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log(state);
  return {
    album: state.album
  };
};
export default connect(mapStateToProps)(AlbumPage);
