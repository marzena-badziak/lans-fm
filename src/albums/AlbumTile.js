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

class AlbumTile extends Component {
  render() {
    return (
      <StyledAlbumCard>
        <CardMedia
          overlay={
            <CardTitle title={this.props.title} subtitle={this.props.artist} />
          }
        >
          <img src={this.props.image} alt={`${this.props.title} cover`} />
        </CardMedia>
        <CardActions>
          <FlatButton label="Scrobble" />
          <FlatButton label="Show Album" />
        </CardActions>
      </StyledAlbumCard>
    );
  }
}
const StyledAlbumCard = styled(Card)`
width: 300px;
margin-top: 30px;
`;
export default AlbumTile;
