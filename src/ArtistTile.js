import React, { Component } from "react";
import styled from "styled-components";
const axios = require("axios");

class ArtistTile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <StyledArtistTile>
        <p>
          <strong>Artist name:</strong> {this.props.name}
        </p>

        <img
          src={this.props.img}
          alt={this.props.name}
          width="200px"
          height="200px"
          // onClick={}
        />
      </StyledArtistTile>
    );
  }
}

const StyledArtistTile = styled.div`
  display: inline-block;
  border: 1px solid gray;
  margin: 10px;
  padding: 5px;
  width: 250px;
  height: 250px;
  background-color: #d9d9d9;
  text-align: center;
`;

export default ArtistTile;
