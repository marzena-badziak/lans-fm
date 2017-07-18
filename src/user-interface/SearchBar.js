import React, { Component } from "react";
import { searchArtist } from "../artists/search-actions.js";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { withRouter } from "react-router";
import styled from "styled-components";
<<<<<<< HEAD
=======
// import RaisedButton from "material-ui/RaisedButton";
// import TextField from "material-ui/TextField";
import FontIcon from "material-ui/FontIcon";

var FontAwesome = require("react-fontawesome");
var MediaQuery = require("react-responsive");
>>>>>>> 393a518fe22a552a70a5aec70200eea598e03120

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
<<<<<<< HEAD
            placeholder="Type artist name to find similar artists"
            //  className="form-control"
=======
            placeholder="Your favourite artist"
>>>>>>> 393a518fe22a552a70a5aec70200eea598e03120
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
<<<<<<< HEAD
  background-color: #DD8899;;
=======
  background-color: #dd8899;
  cursor: pointer;
>>>>>>> 393a518fe22a552a70a5aec70200eea598e03120
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
`;
SearchBar.propTypes = {
  width: propTypes.string
};
export default connect()(withRouter(SearchBar));
