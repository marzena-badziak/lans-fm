import React, { Component } from "react";
import { getAlbumInfo } from "../artists/search-actions.js";
import { connect } from "react-redux";
import { List, ListItem } from "material-ui/List";
import Paper from "material-ui/Paper";
import Avatar from "material-ui/Avatar";
import CircularProgress from "material-ui/CircularProgress";
import FlatButton from "material-ui/FlatButton";
import FontAwesome from "react-fontawesome";
import styled from "styled-components";
import Divider from "material-ui/Divider";
import moment from "moment";
import { withRouter } from "react-router";

class AlbumPage extends Component {
  constructor(props) {
    super(props);
  }

  fetchAlbum = e => {
    this.props.dispatch(
      getAlbumInfo({
        artist: this.props.params.artistName,
        album: this.props.params.albumName
      })
    );
  };
  componentDidMount() {
    this.fetchAlbum();
  }
  showTracks() {
    if (this.props.album.message === "GOT_ALBUMS") {
      console.log(this.props.album);
      return this.props.album.album.tracks.track.map((track, i) => {
        return <ListElement i={i} track={track} />;
      });
    } else {
      return <CircularProgress />;
    }
  }
  goBackToSearchResults = e => {
    e.preventDefault();
    console.log("back to search");
    this.props.router.push("searchResults");
  };
  goBackToArtistPage = e => {
    e.preventDefault();
    console.log("back to artist page");
    this.props.router.push(`${this.props.params.artistName}/albums`);
  };
  render() {
    return (
      <div>
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
              padding: "0"
            }}
          >
            <li
              style={{
                display: "inline",
                margin: "0 auto",
                marginTop: "10px",
                cursor: "pointer"
              }}
              onClick={this.goBackToSearchResults}
            >
              {" "}/ search results{" "}
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
              / {this.props.params.artistName}
            </li>
          </ul>
        </div>
        <div
          className="container"
          style={{
            display: "flex",
            // flexDirection: "column",
            justifyContent: "center"
            // flexWrap: "nowrap"
          }}
        >
          <Paper
            style={{ width: "70%", marginTop: "40px", paddingTop: "10px" }}
          >
            {this.props.album.message === "GOT_ALBUMS"
              ? <div>
                  <Avatar
                    src={this.props.album.album.image[2]["#text"]}
                    size={150}
                  />
                  <h2 style={{ display: "block", textAlign: "center" }}>
                    {this.props.params.albumName}
                  </h2>
                </div>
              : false}
            <List>
              {this.showTracks()}
            </List>
          </Paper>
        </div>
      </div>
    );
  }
}

class ListElement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: "none"
    };
  }
  changeDropdownState = () => {
    if (this.state.open == "none") {
      this.setState({
        open: "block"
      });
    } else {
      this.setState({
        open: "none"
      });
    }
  };

  render() {
    return (
      <div key={this.props.i}>
        <ListItem
          primaryText={`${this.props.i + 1}. ${this.props.track.name}`}
          rightIcon={
            <div
              style={{
                width: "100px",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center"
              }}
            >
              <span>
                {moment()
                  .startOf("day")
                  .add(moment.duration({ s: this.props.track.duration }))
                  .format("mm:ss")}
              </span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "25px",
                  height: "25px"
                }}
                onClick={() => this.changeDropdownState()}
              >
                <FontAwesome
                  className="fa fa-ellipsis-v"
                  name="options"
                  size="lg"
                  aria-hidden="true"
                  style={{ paddingLeft: "12px" }}
                />
              </span>
            </div>
          }
          style={{ textAlign: "left" }}
        />
        <List
          style={{
            display: `${this.state.open}`,
            position: "absolute",
            left: "70%",
            zIndex: "10",
            boxShadow: "0px 0px 30px 3px rgba(0, 0, 0, 0.6)",
            padding: "0px"
          }}
        >
          <StyledDropDownItem>
            {" "}<FontAwesome
              className="fa fa-lastfm"
              name="options"
              size="lg"
              aria-hidden="true"
            />
            {"  "}
            Scroblle
          </StyledDropDownItem>
          <Divider />
          <StyledDropDownItem>
            {" "}<FontAwesome
              className="fa fa-youtube"
              name="options"
              size="lg"
              aria-hidden="true"
            />
            {"  "}
            Youtube
          </StyledDropDownItem>
          <Divider />
          <StyledDropDownItem>
            {" "}<FontAwesome
              className="fa fa-spotify"
              name="options"
              size="lg"
              aria-hidden="true"
            />
            {"  "}
            Spotify
          </StyledDropDownItem>
        </List>
      </div>
    );
  }
}
const StyledDropDownItem = styled.li`
  list-style-type: none;
  padding: 15px;
  background: #ffe0ee;
  z-index: 10;
  cursor: pointer;
  &:hover {
    background: #dd8899;
    opacity: 1;
  }
`;
const mapStateToProps = state => {
  return {
    album: state.album
  };
};
export default connect(mapStateToProps)(withRouter(AlbumPage));
