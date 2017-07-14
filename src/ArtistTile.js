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
    this.setState({
      dropDownDisplay: "block"
    });
  };
  fetchAlbums = e => {
    this.props.dispatch(
      getAlbums({
        data: this.props.name
      })
    );
  };
  renderArtistAlbum = () => {
    if (this.props.albums.albums.album) {
      if (this.props.name == this.props.albums.albums.album[0].artist.name) {
        return (
          <DropdownUl
            diplayStyle={this.state.dropDownDisplay}
            albums={this.props.albums}
          >
            >
          </DropdownUl>
        );
      }
    }
  };
  hideAlbums = () => {
    this.setState({
      dropDownDisplay: "none"
    });
  };
  render() {
    return (
      <StyledArtistTile
        className="col-xs-4 col-md-3"
        onMouseLeave={e => this.hideAlbums(e)}
      >
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
          width="160px"
          height="150px"
          // onClick={}
        />

        <StyledButton
          className="btn btn-default"
          type="StyledButton"
          value={this.props.name}
          onClick={e => this.fetchArtist(e)}
        >
          Search similar
        </StyledButton>
        <StyledButton
          className="btn btn-default"
          onMouseEnter={e => this.setUlDisplay(e)}
        >
          Albums
        </StyledButton>
        {this.renderArtistAlbum()}
      </StyledArtistTile>
    );
  }
}

class DropdownUl extends Component {
  albumRender = () => {
    if (this.props.albums.albums.album) {
      return this.props.albums.albums.album.map((album, i) => {
        return (
          <StyledAlbumElement className="list-group-item" key={i}>
            <StyledSpan>
              {album.name}
            </StyledSpan>
            <img src={album.image[1]["#text"]} alt="Album Foto" />
          </StyledAlbumElement>
        );
      });
    }
  };

  render() {
    return (
      <ul
        style={{
          display: this.props.diplayStyle,
          position: "absolute",
          top: 0,
          zIndex: 2,
          width: "250px",
          height: "300px",
          overflowY: "scroll"
        }}
        className="list-group"
      >
        {this.props.albums.albums.album ? this.albumRender() : false}
      </ul>
    );
  }
}
const StyledSpan = styled.span`
  font-size: large;
  align-self: center;
`;
const StyledAlbumElement = styled.li`
  display: flex;
  justify-content: space-around;
`;
const StyledButton = styled.button`
  margin-top: 15px;
  margin-right: 10px;
`;
const StyledArtistTile = styled.div`
  display: inline-block;
  background-color: #f2f2f2;
  margin: 10px;
  padding: 10px;
  width: 250px;
  height: 300px;

  text-align: center;

  z-index: 1;
`;

ArtistTile.propTypes = {
  name: propTypes.string.isRequired,
  img: propTypes.string.isRequired,
  match: propTypes.string.isRequired
};

DropdownUl.propTypes = {
  albums: propTypes.object.isRequired,
  diplayStyle: propTypes.string.isRequired
};
const mapStateToProps = state => {
  return {
    albums: state.albums
  };
};
export default connect(mapStateToProps)(ArtistTile);
