import React, { Component } from "react";
import { searchArtist } from "./search-actions.js";
import SearchBar from "./SearchBar";
import { connect } from "react-redux";
import propTypes from "prop-types";
// import { Router, Route, IndexRoute, hashHistory } from "react-router";
import { withRouter } from "react-router";
import styled from "styled-components";

class SearchBarTop extends Component {
  fetchArtist = e => {
    e.preventDefault();
    alert("search through top search bar");
    this.props.dispatch(
      searchArtist({
        artist: this.state.searchValue
      })
    );
  };

  render() {
    return <SearchBar {...this.props} onChange={this.fetchArtist} />;
  }
}
SearchBarTop.propTypes = {
  width: propTypes.string
};
export default connect()(withRouter(SearchBarTop));
