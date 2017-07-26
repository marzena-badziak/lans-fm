import React, { Component } from "react";
import { searchArtist } from "./search-actions";
import { connect } from "react-redux";
import Tile from "../user-interface/Tile";
import { withRouter } from "react-router";
import propTypes from "prop-types";

class ArtistTile extends Component {
  fetchArtist = e => {
    e.preventDefault();
    this.props.dispatch(
      searchArtist({
        artist: this.props.name,
      })
    );
    this.props.router.push(this.props.name);
  };
  replaceSpacesWithDashes(str) {
    return str.replace(/\s+/g, "-");
  }
  getAlbums = e => {
    e.preventDefault();
    // budowanie url powinno byc w oddzielnej metodzie
    // lepiej uzyc `` do zlozenia stringa niz z +
    this.props.router.push(
      "/" +
        this.replaceSpacesWithDashes(this.props.params.artistName) +
        "/" +
        this.replaceSpacesWithDashes(this.props.name)
    );
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
  alt: propTypes.string,
};

export default withRouter(ArtistTile);
