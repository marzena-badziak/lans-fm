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
  replaceSpacesWithDashes(str) {
    return str.replace(/\s+/g, "-"); return encodeURIComponent(str);
  }

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
    return (
      <Tile
        opener={() => this.getAlbums}
        cardTitle={this.props.name}
        imageSrc={this.props.img}
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
