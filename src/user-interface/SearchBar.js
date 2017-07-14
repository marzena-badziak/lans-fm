import React, { Component } from "react";
import { searchArtist } from "./search-actions.js";
import { connect } from "react-redux";
import propTypes from "prop-types";
// import { Router, Route, IndexRoute, hashHistory } from "react-router";
import { withRouter } from "react-router";
import styled from "styled-components";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: ""
    };
  }
  setSearchValue = e => {
    this.setState({
      searchValue: e.target.value
    });
  };

  fetchArtist = e => {
    e.preventDefault();
    this.props.dispatch(
      searchArtist({
        artist: this.state.searchValue
      })
    );
    this.props.router.push("searchResults");
  };

  render() {
    return (
      <form
        style={{ width: this.props.width }}
        onSubmit={e => this.fetchArtist(e)}
      >
        <div className="input-group">
          <StyledInput
            onChange={e => this.setSearchValue(e)}
            id="search-bar"
            type="text"
            value={this.state.searchValue}
            placeholder="Type artist name to find similar artists"
            className="form-control"
          />
          <span className="input-group-btn">
            <StyledButton
              className="btn btn-default"
              type="button"
              onClick={e => this.fetchArtist(e)}
            >
              <strong>search</strong>
            </StyledButton>
          </span>
        </div>
      </form>
    );
  }
}

const StyledInput = styled.input`
  height: 50px;
  font-size: 20px;
`;
const StyledButton = styled.button`
  height: 50px;
  width: 100px;
  font-size: 20px;
`;

SearchBar.propTypes = {
  width: propTypes.string
};
export default connect()(withRouter(SearchBar));
