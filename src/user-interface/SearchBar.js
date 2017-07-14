import React, { Component } from "react";
import { searchArtist } from "./search-actions.js";
import { connect } from "react-redux";
import propTypes from "prop-types";
// import { Router, Route, IndexRoute, hashHistory } from "react-router";
import { withRouter } from "react-router";
import styled from "styled-components";
import RaisedButton from "material-ui/RaisedButton";

import TextField from "material-ui/TextField";
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
        <StyledSearchBar>
          <StyledInput
            onChange={e => this.setSearchValue(e)}
            id="search-bar"
            type="text"
            value={this.state.searchValue}
            placeholder="Type artist name to find similar artists"
            //  className="form-control"
          />
          <StyledSpan onClick={e => this.fetchArtist(e)}>Search</StyledSpan>
        </StyledSearchBar>
      </form>
    );
  }
}
const StyledSearchBar = styled.div`
  -webkit-box-shadow: 0px 0px 30px 3px rgba(0, 0, 0, 0.6);
  -moz-box-shadow: 0px 0px 30px 3px rgba(0, 0, 0, 0.6);
  box-shadow: 0px 0px 30px 3px rgba(0, 0, 0, 0.6);
  border-radius: 15px;
  display: flex;
  justify-content: center;
  height: 50px;
  font-size: 20px;
`;
const StyledSpan = styled.div`
padding 15px;
  display: flex;
  background-color: white;
  height: inherit;
  align-items: center;
  border-radius: 0px 10px 10px 0px;
  -moz-border-radius: 0px 10px 10px 0px;
  -webkit-border-radius: 0px 10px 10px 0px;
  border: 1px solid #000000;
  background-color: #f2b3de;
`;
const StyledInput = styled.input`
padding 15px;
  width: 100%;
  height: inherit;
  border-radius: 10px 0px 0px 10px;
  -moz-border-radius: 10px 0px 0px 01px;
  -webkit-border-radius: 10px 0px 0px 10px;
  border: 1px solid #000000;
`;
SearchBar.propTypes = {
  width: propTypes.string
};
export default connect()(withRouter(SearchBar));
