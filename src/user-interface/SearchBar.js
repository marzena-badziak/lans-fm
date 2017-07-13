import React, { Component } from "react";
import { searchArtist } from "./search-actions.js";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import { withRouter } from "react-router";
import TextField from 'material-ui/TextField';
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
          <TextField
            onChange={e => this.setSearchValue(e)}
            id="search-bar"
            type="text"
            value={this.state.searchValue}
            hintText="Type artist name to find similar artists"
          //  className="form-control"
          fullWidth={true}
            style={{ height: "50px" }}
          />
      </form>
    );
  }
}
SearchBar.propTypes = {
  width: propTypes.string
};
export default connect()(withRouter(SearchBar));
