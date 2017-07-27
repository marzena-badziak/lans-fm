import React, { Component } from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import { encodeURI, decodeURI } from "../lib/utils";


class Navigation extends Component {
  goBackToSearchResults = e => {
    e.preventDefault();
    this.props.router.push("/" + decodeURIComponent(this.props.artistName));
  };
  goBackToArtistPage = e => {
    e.preventDefault();
    this.props.router.push(
      `/${decodeURIComponent(this.props.artistName)}/${decodeURIComponent(this.props.artistChosen)}`
    );
  };

  showProperBreadcrump() {
    if (!this.props.artistChosen) {
      return (
        <li
          style={{
            display: "inline",
            margin: "0 auto",
            marginTop: "10px",
            cursor: "pointer"
          }}
          onClick={this.goBackToSearchResults}
        >
          {" "}/ Search results:{" "}
          {decodeURI(this.props.artistName)}{" "}
        </li>
      );
    } else {
      return (
        <div>
          <li
            style={{
              display: "inline",
              margin: "0 auto",
              marginTop: "10px",
              cursor: "pointer"
            }}
            onClick={this.goBackToSearchResults}
          >
            {" "}/ Search results:{" "}
            {decodeURI(this.props.artistName)}{" "}
          </li>
          <li
            style={{
              display: "inline",
              margin: "0 auto",
              marginTop: "10px",
              cursor: "pointer"
            }}
            onClick={this.goBackToArtistPage}
          >
            / {decodeURI(this.props.artistChosen)}
          </li>
        </div>
      );
    }
  }
  render() {
    return (
      <div
        style={{
          position: "absolute",
          left: "0",
          display: "block",
          margin: "10px"
        }}
      >
        <ul
          style={{
            display: "inline-block",
            listStyleType: "none",
            margin: "2px",
            padding: "0",
            color: "#7a3e5e",
            fontWeight: "bold"
          }}
        >
          {this.showProperBreadcrump()}
        </ul>
      </div>
    );
  }
}
Navigation.propTypes = {
  artistChosen: PropTypes.string,
  artistName: PropTypes.string.isRequired
};

export default withRouter(Navigation);
