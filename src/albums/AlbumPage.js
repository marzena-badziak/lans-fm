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
class AlbumPage extends Component {
  constructor(props) {
    super(props);
  }

  fetchAlbum = e => {
    this.props.dispatch(
      getAlbumInfo({
        artist: this.props.params.AritstName,
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
  render() {
    return (
      <div
        className="container"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Paper style={{ width: "70%" }}>
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
                style={{ display: "flex", alignItems: "center" }}
                onClick={() => this.changeDropdownState()}
              >
                <FontAwesome
                  className="fa fa-ellipsis-v"
                  name="options"
                  size="lg"
                  aria-hidden="true"
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
export default connect(mapStateToProps)(AlbumPage);
