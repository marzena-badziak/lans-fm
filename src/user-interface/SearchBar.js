import React, { Component } from "react";
import {searchArtist} from "./search-actions.js";
<<<<<<< Updated upstream:src/user-interface/SearchBar.js
import { connect } from 'react-redux';
=======
>>>>>>> Stashed changes:src/user-interface/SearchBar.js

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: ""
    };
  }
  setSearchValue = e => {
    console.log(e);
    this.setState({
      searchValue: e.target.value
    });
  };
  fetchArtist = e => {
    e.preventDefault();
<<<<<<< Updated upstream:src/user-interface/SearchBar.js
    this.props.dispatch(  
      searchArtist({
        artist: this.state.searchValue
      })
    );
=======
    searchArtist({artist: this.state.searchValue});
    console.log(this.state.searchValue);
>>>>>>> Stashed changes:src/user-interface/SearchBar.js
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={e => this.fetchArtist(e)}>
          <h1 htmlFor="search-bar">Search Artist</h1>
          <div className="input-group">
            <input
              onChange={e => this.setSearchValue(e)}
              id="search-bar"
              type="text"
              value={this.state.searchValue}
              placeholder="Iron Maiden"
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
      </div>
    );
  }
}

export default connect()(SearchBar);
