import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import ArtistTile from "./ArtistTile.js";
import propTypes from "prop-types";
// const axios = require("axios");

class ArtistsGrid extends Component {
  render() {
    var grid = [];
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
          {grid.length === 0
            ? <h3>No results</h3>
            : <div>
                <h2>
                  Search results for: {this.props.artistEntered}
                </h2>
                <dbody>
                  {grid}
                </dbody>
              </div>}
        </SearchResultsContainer>
      </div>
    );
  }
}

const SearchResultsContainer = styled.div`
  float: none;
  margin: 0 auto;
  padding: 10px;
`;

const mapStateToProps = state => {
  return {
    results: state.search.artistsSimilar,
    artistEntered: state.search.artistEntered
  };
};
ArtistsGrid.propTypes = {
  results: propTypes.array
};
export default connect(mapStateToProps)(ArtistsGrid);
