import React, { Component } from "react";

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
    console.log(this.state.searchValue);
  };
  render() {
    return (
      <form>
        <label htmlFor="search-bar">Search Artist</label>
        <input
          onChange={e => this.setSearchValue(e)}
          id="search-bar"
          type="text"
          value={this.state.searchValue}
          placeholder="Iron Maiden"
        />
        <button type="submit" onClick={e => this.fetchArtist(e)}>
          Search
        </button>
      </form>
    );
  }
}

export default SearchBar;
