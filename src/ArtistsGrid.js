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
    var grid = [];

    artistsListToShow.forEach(artist => {
      grid.push(
        <ArtistTile
          name={artist.bandName}
          key={artist.bandName}
          album={artist.album}
          img={artist.img}
        />
      );
    });

    return (
      <div
        className="row"
        style={{
          float: "none",
          margin: "0 auto",
          padding: "10px"
        }}
      >
        <dbody>
          {grid}
        </dbody>
      </div>
    );
  }
}

export default connect()(ArtistsGrid);
