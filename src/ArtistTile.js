import React, { Component } from "react";
import styled from "styled-components";
import propTypes from "prop-types";
import { searchArtist } from "./user-interface/search-actions";
import { connect } from "react-redux";
import axios from "axios";
import { getAlbums } from "./user-interface/search-actions.js";
class ArtistTile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropDownDisplay: "none"
    };
  }

  fetchArtist = e => {
    e.preventDefault();
    this.props.dispatch(
      searchArtist({
        artist: this.props.name
      })
    );
  };
  setUlDisplay = e => {
    this.fetchAlbums();
    if (this.dropDownDisplay == "none") {
      this.setState({
        dropDownDisplay: "block"
      });
    }
  };
  fetchAlbums = e => {
    console.log(this.props.name);
    this.props.dispatch(
      getAlbums({
        data: this.props.name
      })
    );
  };
  renderArtistAlbum = () => {
    if (this.props.albums.albums.album) {
      if (this.props.name == this.props.albums.albums.album[0].artist.name) {
        return <DropdownUl albums={this.props.albums}>></DropdownUl>;
      }
    }
  };
  render() {
    return (
      <StyledArtistTile className="col-xs-4 col-md-3">
        <p>
          <strong>
            {this.props.name}
          </strong>
        </p>
        <p>
          Match strength:{" "}
          <strong style={{ color: "#003366" }}>
            {parseFloat(this.props.match).toFixed(2)}
          </strong>
        </p>

        <img
          src={this.props.img}
          alt={this.props.name}
          width="150px"
          height="150px"
          // onClick={}
        />
        <p>
          <button
            className="btn btn-default"
            type="button"
            value={this.props.name}
            onClick={e => this.fetchArtist(e)}
          >
            Search similar
          </button>
        </p>
        <button onClick={e => this.setUlDisplay(e)}>
          <p>Albums</p>
        </button>
        {this.renderArtistAlbum()}
      </StyledArtistTile>
    );
  }
}

class DropdownUl extends Component {
  albumRender = () => {
    if (this.props.albums.albums.album) {
      return this.props.albums.albums.album.map(album => {
        return (
          <li>
            Name: {album.name}
            {
              // <img src={album.image[1].text} alt="Album Foto" />
            }
          </li>
        );
      });
    }
  };

  render() {
    console.log(this.albumRender());
    return (
      <ul>
        {console.log(this.props.albums.albums.album)}

        {this.props.albums.albums.album ? this.albumRender() : false}
      </ul>
    );
  }
}

const StyledArtistTile = styled.div`
  display: inline-block;
  background-color: #f2f2f2;
  margin: 10px;
  padding: 10px;
  width: 250px;
  height: 300px;

  text-align: center;
`;

ArtistTile.propTypes = {
  name: propTypes.string.isRequired,
  img: propTypes.string.isRequired,
  match: propTypes.string.isRequired
};
const mapStateToProps = state => {
  return {
    albums: state.albums
  };
};
export default connect(mapStateToProps)(ArtistTile);
