import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import ArtistTile from "./ArtistTile.js";
import propTypes from "prop-types";
import CircularProgress from "material-ui/CircularProgress";

class ArtistsGrid extends Component {
  render() {
    var grid = [];
    this.props.results.forEach(artist => {
      grid.push(
        <ArtistTile
          name={artist.name}
          key={artist.name}
          img={artist.image[2]["#text"]}
        />
      );
    });
    return (
      <div>
        <StyledMessage>
          {this.props.message} {this.props.artistEntered}
        </StyledMessage>
        {this.props.message === "Searching: "
          ? <StyledCircularProgress color="#aa8899" />
          : false}
        <SearchResultsContainer className="row">
          <dbody>
            {grid}
          </dbody>
        </SearchResultsContainer>
      </div>
    );
  }
}

const SearchResultsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  align-content: flex-start;
  float: none;
  margin: 0 auto;
  padding: 20px 0;
`;

const StyledMessage = styled.h2`padding-bottom: 20px;`;
const StyledCircularProgress = styled(CircularProgress)`
  display: block;
  margin: 0 auto;
  margin-top: 60px;
`;

const mapStateToProps = state => {
  return {
    results: state.similarArtists.artistsSimilar,
    artistEntered: state.similarArtists.artistEntered,
    message: state.similarArtists.message
  };
};
ArtistsGrid.propTypes = {
  results: propTypes.array,
  artistEntered: propTypes.string
};
export default connect(mapStateToProps)(ArtistsGrid);
