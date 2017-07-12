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
      </StyledArtistTile>
    );
  }
}

const StyledArtistTile = styled.div`
  display: inline-block;
  background-color: #f2f2f2;
  margin: 10px;
  padding: 10px;
  width: 250px;
  height: 250px;

  text-align: center;
`;

export default ArtistTile;
