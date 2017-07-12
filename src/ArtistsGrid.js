import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import ArtistTile from "./ArtistTile.js";

const axios = require("axios");

var artistsListToShow = [
  {
    bandName: "Led Zeppelin",
    album: "refeowfds",
    img: "http://cps-static.rovicorp.com/3/JPG_500/MI0004/105/MI0004105188.jpg"
  },
  {
    bandName: "Iron Maiden",
    album: "dfmojposdpc",
    img: "http://cps-static.rovicorp.com/3/JPG_500/MI0004/105/MI0004105188.jpg"
  },
  {
    bandName: "Ozric Tentacles",
    album: "hrwigeifohfvil",
    img: "http://cps-static.rovicorp.com/3/JPG_500/MI0004/105/MI0004105188.jpg"
  },
  {
    bandName: "Shpongle",
    album: "fdlwodslioj",
    img: "http://cps-static.rovicorp.com/3/JPG_500/MI0004/105/MI0004105188.jpg"
  },
  {
    bandName: "Genesis",
    album: "dfmojposdpc",
    img: "http://cps-static.rovicorp.com/3/JPG_500/MI0004/105/MI0004105188.jpg"
  },
  {
    bandName: "Pink Floyd",
    album: "hrwigeifohfvil",
    img: "http://cps-static.rovicorp.com/3/JPG_500/MI0004/105/MI0004105188.jpg"
  },
  {
    bandName: "Metallica",
    album: "fdlwodslioj",
    img: "http://cps-static.rovicorp.com/3/JPG_500/MI0004/105/MI0004105188.jpg"
  }
];

class ArtistsGrid extends Component {
  render() {
    console.log(this.props);
    var grid = [];
    this.props.results.forEach(artist => {
      grid.push(
        <ArtistTile
          name={artist.name}
          key={artist.name}
          // album={artist.album}
          img={artist.image[2]["#text"]}
          match={artist.match}
        />
      );
    });

    return (
      <SearchResultsContainer className="row">
        <dbody>
          {grid}
        </dbody>
      </SearchResultsContainer>
    );
  }
}

const SearchResultsContainer = styled.div`
  float: none;
  margin: 0 auto;
  padding: 10px;
`;

const mapStateToProps = state => {
  return { results: state.search.artistsSimilar };
};

export default connect(mapStateToProps)(ArtistsGrid);
