import React, { Component } from "react";
import { Card, CardActions, CardMedia, CardTitle } from "material-ui/Card";
import styled from "styled-components";
import FlatButton from "material-ui/FlatButton";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { fetchSongListAndScrobbleAlbum } from "./scrobble-album";

class AlbumTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: 0
    };
  }
  setImage = () => {
    if (this.props.image) {
      return this.props.image;
    } else {
      return "https://lastfm-img2.akamaized.net/i/u/174s/c6f59c1e5e7240a4c0d427abd71f3dbb.png";
    }
  };

  openAlbum = () => {
    return this.props.router.push(
      "/" +
        this.replaceSpacesWithDashes(this.props.params.artistName) +
        "/" +
        this.replaceSpacesWithDashes(this.props.params.artistChosen) +
        "/" +
        this.replaceSpacesWithDashes(this.props.title)
    );
  };

  replaceSpacesWithDashes(str) {
    return str.replace(/\s+/g, "-");
  }
  scrobbleAlbum = e => {
    if(this.props.session.sessionKey === ""){
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
  setOpacity(val) {
    this.setState({ opacity: val });
  }

  render() {
    return (
      <StyledAlbumCard>
        <AlbumImage
          onClick={() => this.openAlbum()}
          onMouseLeave={() => this.setOpacity(0)}
          onMouseEnter={() => this.setOpacity(1)}
          overlay={
            <CardTitle title={this.props.title} subtitle={this.props.artist} />
          }
        >
          <img src={this.setImage()} alt={`${this.props.title} cover`} />
          <Overlay style={{ opacity: this.state.opacity }}>
            <TextOnOverlay>Show Album</TextOnOverlay>
          </Overlay>
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

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
`;
const TextOnOverlay = styled.div`
  color: white;
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
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
