import React, { Component } from "react";
import styled from "styled-components";
import propTypes from "prop-types";
import { searchArtist } from "./user-interface/search-actions";
import { connect } from "react-redux";
import axios from "axios";
import { getAlbums } from "./user-interface/search-actions.js";
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
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
  hideAlbums = (e) => {
    this.setState({
      dropDownDisplay: "none"
    });
  };
  render() {
    return (
      <StyledArtistTile
        className="col-xs-4 col-md-3"
        onMouseLeave={this.hideAlbums}
      >
          <CardHeader title={this.props.name} />
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
        <RaisedButton
        style={{margin:"5px"}}
        label="Search similar"
          primary={true}
          value={this.props.name}
          onClick={e => this.fetchArtist(e)}
       />
        <RaisedButton
        label="Albums"
        primary={true}
          onMouseEnter={e => this.setUlDisplay(e)}
        />
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
          <ListItem className="list-group-item" key={i}  primaryText={album.name}
        leftAvatar={<Avatar src={album.image[1]["#text"]} alt="Album Foto" />} />
        );
      });
    }
  };

  render() {
    const { diplayStyle, albums } = this.props
    return (
      <AlbumsList
        display= {diplayStyle}
      >
        {albums.albums.album ? this.albumRender() : false}
      </AlbumsList>
    );
  }
}

const AlbumsList = styled(List)`
          display: ${props => props.display};
          position: absolute;
          top: 0;
          z-index: 2;
          width: 260px;
          height: 330px;
          overflow-y: scroll;
          background-color: #81D4FA;

`

const StyledSpan = styled.span`
  font-size: large;
  align-self: center;
`;
const StyledAlbumElement = styled.li`
  display: flex;
  justify-content: space-around;
`;
const StyledArtistTile = styled(Card)`
  display: inline-block;
  background-color: #000;
  margin: 10px;
  padding: 10px;
  width: 250px;
  height: 330px;
  text-align: center;
  z-index: 1;
  padding-left: 0px
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
