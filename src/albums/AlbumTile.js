import React, { Component } from "react";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";
import styled from "styled-components";
import FlatButton from "material-ui/FlatButton";
import axios from "axios";
import lastfmApi from "../lib/lastfm-api";
import propTypes from "prop-types";
import { withRouter } from "react-router";
import { fetchSongListAndScrobbleAlbum } from "./scrobble-albums";

class AlbumTile extends Component {
  setImage = () => {
    if (this.props.image) {
      return this.props.image;
    } else {
      return "https://lastfm-img2.akamaized.net/i/u/174s/c6f59c1e5e7240a4c0d427abd71f3dbb.png";
    }
  };
  openAlbum = () => {
    return this.props.router.push(
      `${this.props.artist}/albums/${this.props.title}`
    );
  };

  scrobbleAlbum = e => {
    this.props.dispatch(
      scrobbleAlbum({
        artist: this.props.session,
        album: this.props.album
      })
    );
  };

  render() {
    return (
      <StyledAlbumCard onClick={() => this.openAlbum()}>
        <AlbumImage
          overlay={
            <CardTitle title={this.props.title} subtitle={this.props.artist} />
          }
        >
          <img src={this.setImage()} alt={`${this.props.title} cover`} />
        </AlbumImage>
        <CardActions>
          <FlatButton
            label="Scrobble"
            backgroundColor="plum"
            onClick ={() => this.scrobbleAlbum}/>
          <FlatButton
            label="Show Album"
            backgroundColor="hotpink"
            onClick={() => this.openAlbum()}
          />
        </CardActions>
      </StyledAlbumCard>
    );
  }
}
const StyledAlbumCard = styled(Card)`
width: 300px;
margin-top: 30px;


`;
const AlbumImage = styled(CardMedia)`

transition: .2s all;

&:hover{
  -webkit-filter: brightness(50%)
}
`;

AlbumTile.propTypes = {
  title: propTypes.string,
  image: propTypes.string,
  artist: propTypes.string
};
export default withRouter(AlbumTile);
