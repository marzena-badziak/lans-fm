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
import propTypes from "prop-types";
import { withRouter } from "react-router";

class AlbumTile extends Component {
  // nazwa nieadekwatna do tego co robi funkcja
  checkImage = () => {
    if (this.props.image) {
      return this.props.image;
    } else {
      return "https://lastfm-img2.akamaized.net/i/u/174s/c6f59c1e5e7240a4c0d427abd71f3dbb.png";
    }
  };
  render() {
    return (
      <StyledAlbumCard>
        <CardMedia
          overlay={
            <CardTitle title={this.props.title} subtitle={this.props.artist} />
          }>
          <img src={this.checkImage()} alt={`${this.props.title} cover`} />
        </CardMedia>
        <CardActions>
          <FlatButton label="Scrobble" />
          <FlatButton
            label="Show Album"
            onClick={() =>
              this.props.router.push(
                `${this.props.artist}/albums/${this.props.title}`
              )}
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

AlbumTile.propTypes = {
  title: propTypes.string,
  image: propTypes.string,
  artist: propTypes.string
};
export default withRouter(AlbumTile);
