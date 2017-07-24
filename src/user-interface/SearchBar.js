import React, { Component } from "react";
import { searchArtist } from "../artists/search-actions.js";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { withRouter } from "react-router";
import styled from "styled-components";
import FontAwesome from "react-fontawesome";

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
    this.props.router.push(
      "/" + this.replaceSpacesWithDashes(this.state.searchValue)
    );
  };

  replaceSpacesWithDashes(str) {
    return str.replace(/\s+/g, "-");
  }

  render() {
    return (
      <form onSubmit={e => this.fetchArtist(e)}>
        <StyledSearchBar {...this.props}>
          <StyledSearchInput
            onChange={e => this.setSearchValue(e)}
            id="search-bar"
            type="text"
            value={this.state.searchValue}
            placeholder="Your favourite artist"
          />{" "}
          <StyledSearchSpan onClick={e => this.fetchArtist(e)}>
            <FontAwesome
              className="fa fa-search"
              name="search"
              style={{ textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)" }}
            />
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
  color: white;
  display: flex;
  height: inherit;
  align-items: center;
  padding: 0 25px;
  border-radius: 0px 10px 10px 0px;
  border: 1px solid #000000;
  background-color: #dd8899;
  cursor: pointer;
`;
const StyledSearchInput = styled.input`
  color: black;
  width: 100%;
  height: inherit;
  padding: 0 15px;
  border-radius: 10px 0px 0px 10px;
  border: 1px solid #000000;
  ::-webkit-input-placeholder {
    text-align: center;
  }

  :-moz-placeholder {
    /* Firefox 18- */
    text-align: center;
  }

  ::-moz-placeholder {
    /* Firefox 19+ */
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
