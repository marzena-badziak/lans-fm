import React, { Component } from "react";
import { searchArtist } from "./search-actions";
import { connect } from "react-redux";
import Tile from "../user-interface/Tile";
import { withRouter } from "react-router";
import propTypes from "prop-types";
import { encodeURI, decodeURI } from "../lib/utils";

class ArtistTile extends Component {
  fetchArtist = e => {
    e.preventDefault();
    this.props.dispatch(
      searchArtist({
        artist: this.props.name
      })
    );
    this.props.router.push(this.props.name);
  };
  setImage = () => {
    if (this.props.img) {
      return this.props.img;
    } else {
      return "https://lastfm-img2.akamaized.net/i/u/174s/c6f59c1e5e7240a4c0d427abd71f3dbb.png";
    }
  };
  buildAlbumsAddress = () => {
    return (
      "/" +
      encodeURI(this.props.params.artistName) +
      "/" +
      encodeURI(this.props.name)
    );
  };
  getAlbums = e => {
    e.preventDefault();
    this.props.router.push(this.buildAlbumsAddress());
  };

  setOpacity(val) {
    this.setState({ opacity: val });
  }

  render() {
    const image = this.setImage();
    return (
      <Tile
        opener={() => this.getAlbums}
        cardTitle={this.props.name}
        imageSrc={image}
        imageAlt={this.props.imageAlt}
        firstButtonOnClick={() => this.fetchArtist}
        secondButtonOnClick={() => this.getAlbums}
        labelFirst="Similar Artist"
        labelSecond="Open Artist"
      />
    );
  }
}

ArtistTile.propTypes = {
  name: propTypes.string.isRequired,
  img: propTypes.string.isRequired,
  alt: propTypes.string
};

export default connect()(withRouter(ArtistTile));
