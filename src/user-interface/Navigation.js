import React, { Component } from "react";
import { withRouter } from "react-router";

class Navigation extends Component {
  goBackToSearchResults = e => {
    e.preventDefault();
    console.log("back to search");
    this.props.router.push("/" + this.props.artistName);
  };
  goBackToArtistPage = e => {
    e.preventDefault();
    this.props.router.push(
      `/${this.props.artistName}/${this.props.artistChosen}`
    );
  };
  replaceDashWithSpace(str) {
    return str.replace(/-/g, " ");
  }
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
          {this.replaceDashWithSpace(this.props.artistName)}{" "}
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
            {this.replaceDashWithSpace(this.props.artistName)}{" "}
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
            / {this.replaceDashWithSpace(this.props.artistChosen)}
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
            color: "#aa8899",
            fontWeight: "bold"
          }}
        >
          {this.showProperBreadcrump()}
        </ul>
      </div>
    );
  }
}

export default withRouter(Navigation);
