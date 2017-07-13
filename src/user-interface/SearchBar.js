import React, { Component } from "react";
import { searchArtist } from "./search-actions.js";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import { withRouter } from "react-router";

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
          <input
            onChange={e => this.setSearchValue(e)}
            id="search-bar"
            type="text"
            value={this.state.searchValue}
            placeholder="Type artist name to find similar artists"
            className="form-control"
            style={{ height: "50px" }}
          />
          <span className="input-group-btn">
            <button
              className="btn btn-default"
              type="button"
              onClick={e => this.fetchArtist(e)}
              style={{ height: "50px", width: "50px" }}
            >
              <span className="glyphicon glyphicon-search" aria-hidden="true" />
            </button>
          </span>
        </div>
      </form>
    );
  }
}
SearchBar.propTypes = {
  width: propTypes.string
};
export default connect()(withRouter(SearchBar));
