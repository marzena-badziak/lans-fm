import React, { Component } from "react";
import styled from "styled-components";
const axios = require("axios");

class ArtistTile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <StyledArtistTile className="col-xs-4 col-md-3">
        <p>
          <strong>Artist name:</strong> {this.props.name}
        </p>

        <img
          src={this.props.img}
          alt={this.props.name}
          width="150px"
          height="150px"
          // onClick={}
        />
      </StyledArtistTile>
    );
  }
}

const StyledArtistTile = styled.div`
  display: inline-block;
  margin: 10px;
  padding: 15px 5px;
  width: 250px;
  height: 250px;
  background-color: #f2f2f2;
  text-align: center;
`;

export default ArtistTile;
