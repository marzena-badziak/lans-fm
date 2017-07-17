import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import ArtistTile from "./ArtistTile.js";
import propTypes from "prop-types";
// const axios = require("axios");

class ArtistsGrid extends Component {
  render() {
    var grid = [];
    // console.log(this.props.results);
    this.props.results.forEach(artist => {
      grid.push(
        <ArtistTile
          name={artist.name}
          key={artist.name}
          img={artist.image[2]["#text"]}
          match={artist.match}
        />
      );
    });
    // console.log(grid);
    return (
      <div className="container">
        <SearchResultsContainer className="row">
<<<<<<< HEAD
          <h2>
=======
          <h2 style={{ paddingBottom: "20px" }}>
>>>>>>> b1d1e9269d438b8a4873b16ac8d549ef4073685c
            {this.props.message} {this.props.artistEntered}
          </h2>
          <dbody>
            {grid}
          </dbody>
        </SearchResultsContainer>
      </div>
    );
  }
}

const SearchResultsContainer = styled.div`
  float: none;
  margin: 0 auto;
  padding: 20px 0;
`;

const mapStateToProps = state => {
  return {
    results: state.search.artistsSimilar,
    artistEntered: state.search.artistEntered,
    message: state.search.message
  };
};
ArtistsGrid.propTypes = {
  results: propTypes.array,
  artistEntered: propTypes.string
};
export default connect(mapStateToProps)(ArtistsGrid);
