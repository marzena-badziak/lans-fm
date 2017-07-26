import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { searchArtist } from "../artists/search-actions.js";
import ArtistTile from "./ArtistTile.js";
import propTypes from "prop-types";
import CircularProgress from "material-ui/CircularProgress";

class ArtistsGrid extends Component {
  fetchArtist = e => {
    this.props.dispatch(
      searchArtist({
        artist: this.props.params.artistName,
      })
    );
  };

  componentDidMount() {
    this.fetchArtist();
  }
  replaceDashWithSpace(str) {
    return str.replace(/-/g, " ");
  }
  render() {
    let grid = [];
    // czemu forEach a nie map?
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
          {this.props.message}{" "}
          <strong>{this.replaceDashWithSpace(this.props.artistEntered)}</strong>
        </StyledMessage>

        {this.props.message === "Searching: "
          ? <StyledCircularProgress color="#aa8899" />
          : false}
        <SearchResultsContainer className="container">
          {grid}
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
  margin: 0 auto;
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
    message: state.similarArtists.message,
  };
};
ArtistsGrid.propTypes = {
  results: propTypes.array,
  artistEntered: propTypes.string,
  message: propTypes.string,
};
export default connect(mapStateToProps)(ArtistsGrid);
