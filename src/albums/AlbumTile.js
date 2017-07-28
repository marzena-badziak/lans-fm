import React, { Component } from "react";
import { fetchSongListAndScrobbleAlbum } from "./scrobble-album";
import { connect } from "react-redux";
import Tile from "../user-interface/Tile";
import { withRouter } from "react-router";
import propTypes from "prop-types";
import { encodeURI, decodeURI } from "../lib/utils";

class AlbumTile extends Component {
  setImage = () => {
    if (this.props.image) {
      return this.props.image;
    } else {
      return "https://lastfm-img2.akamaized.net/i/u/174s/c6f59c1e5e7240a4c0d427abd71f3dbb.png";
    }
  };
  createAlbumUrl = (...args) => {
    const urlArr = [...args].map(item => {
      return "/" + encodeURI(item);
    });
    return urlArr.join("");
  };
  openAlbum = () => {
    return this.props.router.push(
      this.createAlbumUrl(
        this.props.params.artistName,
        this.props.params.artistChosen,
        this.props.title
      )
    );
  };

  scrobbleAlbum = e => {
    if (this.props.session.sessionKey === "") {
      alert("You are not logged on last.fm, please login and try again.");
      return;
    }
    this.props.dispatch(
      fetchSongListAndScrobbleAlbum({
        artist: this.props.artist,
        album: this.props.title,
        session: this.props.session
      })
    );
  };
  render() {
    const image = this.setImage();
    return (
      <Tile
        opener={() => this.openAlbum}
        cardTitle={this.props.title}
        subtitle={this.props.artist}
        imageSrc={image}
        imageAlt={`${this.props.title} cover`}
        firstButtonOnClick={() => this.scrobbleAlbum}
        secondButtonOnClick={() => this.openAlbum}
        labelFirst="Scrobble"
        labelSecond="Open Album"
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    session: state.session
  };
};
AlbumTile.propTypes = {
  title: propTypes.string,
  image: propTypes.string,
  artist: propTypes.string
};

export default connect(mapStateToProps)(withRouter(AlbumTile));
