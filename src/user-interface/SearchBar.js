import React, { Component } from "react";
import { searchArtist } from "./search-actions.js";
import { connect } from "react-redux";
import propTypes from 'prop-types';

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
  };

  render() {
    return (
        <form style={{width:this.props.width}} onSubmit={e => this.fetchArtist(e)}>
          <div className="input-group">
            <input
              onChange={e => this.setSearchValue(e)}
              id="search-bar"
              type="text"
              value={this.state.searchValue}
              placeholder="Type artist name to find similar artists"
              className="form-control"
            />
            <span className="input-group-btn">
              <button
                className="btn btn-default"
                type="button"
                onClick={e => this.fetchArtist(e)}
              >
                <span
                  className="glyphicon glyphicon-search"
                  aria-hidden="true"
                />
              </button>
            </span>
          </div>
        </form>
    );
  }
}
SearchBar.propTypes = {
  width: propTypes.string
}
export default connect()(SearchBar);
