import React, { Component } from "react";
import { searchArtist } from "../artists/search-actions.js";
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
      <form onSubmit={e => this.fetchArtist(e)}>
        <StyledSearchBar {...this.props}>
          <StyledSearchInput
            onChange={e => this.setSearchValue(e)}
            id="search-bar"
            type="text"
            value={this.state.searchValue}
            placeholder="Type artist name to find similar artists"
            //  className="form-control"
          />
          <StyledSearchSpan onClick={e => this.fetchArtist(e)}>
            Search
          </StyledSearchSpan>
        </StyledSearchBar>
      </form>
    );
  }
}
const StyledSearchBar = styled.div`
  box-shadow: ${props => props.boxShadow};
  border-radius: 15px;
  display: flex;
  align-items: baseline;
  height: ${props => props.height};
  font-size: 20px;
  width: ${props => props.width};
  margin: 0 auto;
`;
const StyledSearchSpan = styled.div`
padding 15px;
  display: flex;
  background-color: white;
  height: inherit;
  align-items: center;
  border-radius: 0px 10px 10px 0px;
  -moz-border-radius: 0px 10px 10px 0px;
  -webkit-border-radius: 0px 10px 10px 0px;
  border: 1px solid #000000;
  background-color: #DD8899;
  cursor: pointer;
`;
const StyledSearchInput = styled.input`
color:black;
padding 15px;
  width: 100%;
  height: inherit;
  border-radius: 10px 0px 0px 10px;
  -moz-border-radius: 10px 0px 0px 01px;
  -webkit-border-radius: 10px 0px 0px 10px;
  border: 1px solid #000000;
  ::-webkit-input-placeholder {
     text-align: center;
  }

  :-moz-placeholder { /* Firefox 18- */
     text-align: center;
  }

  ::-moz-placeholder {  /* Firefox 19+ */
     text-align: center;
  }

  :-ms-input-placeholder {
     text-align: center;
  }


`;
SearchBar.propTypes = {
  width: propTypes.string
};
export default connect()(withRouter(SearchBar));
