import React, { Component } from "react";
import { Card, CardActions, CardMedia, CardTitle } from "material-ui/Card";
import styled from "styled-components";
import FlatButton from "material-ui/FlatButton";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { fetchSongListAndScrobbleAlbum } from "./scrobble-album";

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
      `${this.props.params.artistName}/${this.props.params.artistChosen}/${this
        .props.title}`
    );
  };

  scrobbleAlbum = e => {
    this.props.dispatch(
      fetchSongListAndScrobbleAlbum({
        artist: this.props.artist,
        album: this.props.title,
        session: this.props.session
      })
    );
  };

  render() {
    return (
      <StyledAlbumCard>
        <AlbumImage
          onClick={() => this.openAlbum()}
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
            onClick={() => this.scrobbleAlbum()}
            hoverColor="#ccd4d4"
          />
          <FlatButton
            label="Show Album"
            backgroundColor="hotpink"
            onClick={() => this.openAlbum()}
            hoverColor="#ccd4d4"
          />
        </CardActions>
      </StyledAlbumCard>
    );
  }
}
const StyledAlbumCard = styled(Card)`
${"" /* overflow: hidden;
position: relative;
display: inline-block; */}
width: 260px;
margin 0 auto;
margin-top: 30px;

`;
const AlbumImage = styled(CardMedia)`

transition: .2s all;

&:hover{
  -webkit-filter: brightness(80%)
}
`;

AlbumTile.propTypes = {
  title: propTypes.string,
  image: propTypes.string,
  artist: propTypes.string
};

const mapStateToProps = state => {
  return {
    session: state.session
  };
};
export default connect(mapStateToProps)(withRouter(AlbumTile));
