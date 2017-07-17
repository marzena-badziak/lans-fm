import React, { Component } from "react";
import styled from "styled-components";
import propTypes from "prop-types";
import { searchArtist } from "./search-actions";
import { connect } from "react-redux";
import axios from "axios";
import { getAlbums } from "./search-actions.js";
import RaisedButton from "material-ui/RaisedButton";
import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";
import { List, ListItem } from "material-ui/List";
import Avatar from "material-ui/Avatar";
import ShowVideo from "./ShowVideo";

class ArtistTile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropDownDisplay: "none",
      playVideo: false,
      videoId: "",
      videoFound: true
    };
  }

  fetchArtist = e => {
    e.preventDefault();
    this.props.dispatch(
      searchArtist({
        artist: this.props.name
      })
    );
  };
  setUlDisplay = e => {
    this.fetchAlbums();
    this.setState({
      dropDownDisplay: "block"
    });
  };
  fetchAlbums = e => {
    this.props.dispatch(
      getAlbums({
        data: this.props.name
      })
    );
  };
  renderVideo = () => {
    axios
      .get(
        "https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&q=" +
          this.props.name +
          "+VEVO" +
          "&type=video&key=AIzaSyBdXp1WnmYGXXuDFybXxK_94awGD5Qm-Zw"
      )
      .then(response => {
        this.setState({
          videoId: response.data.items[0].id.videoId,
          playVideo: true,
          videoFound: true
        });
      })
      .catch(err => {
        this.setState({ playVideo: true, videoFound: false });
        console.log("no video found, videoFound: " + this.state.videoFound);
      });
  };

  renderArtistAlbum = () => {
    if (this.props.albums.albums.album) {
      if (this.props.name == this.props.albums.albums.album[0].artist.name) {
        return (
          <DropdownUl
            diplayStyle={this.state.dropDownDisplay}
            albums={this.props.albums}
          >
            >
          </DropdownUl>
        );
      }
    }
  };
  hideAlbums = e => {
    this.setState({
      dropDownDisplay: "none"
    });
  };
  render() {
    return (
      <StyledArtistTile
        // className="col-xs-4 col-md-3"
        onMouseLeave={this.hideAlbums}
      >
        {this.props.name.length > 22
          ? <h4
              style={{
                marginTop: "5px",
                marginBottom: "13px",
                paddingTop: "0",
                fontWeight: "bold"
              }}
            >
              {this.props.name}
            </h4>
          : <h3
              style={{ marginTop: "0px", paddingTop: "0", fontWeight: "bold" }}
            >
              {this.props.name}
            </h3>}
        <p style={{ fontSize: "8px", padding: "0" }}>
          Match strength:{" "}
          <strong style={{ color: "#003366" }}>
            {parseFloat(this.props.match).toFixed(2)}
          </strong>
        </p>

        <img
          src={this.props.img}
          alt={this.props.name}
          width="260px"
          height="260px"
          // onClick={}
        />
        <div style={{ textAlign: "center" }}>
          <RaisedButton
            style={{ margin: "5px" }}
            backgroundColor="#AA8899"
            label="Search similar"
            labelColor="#ffffff"
            value={this.props.name}
            onClick={e => this.fetchArtist(e)}
          />
          <RaisedButton
            label="Albums"
            backgroundColor="#AA8899"
            labelColor="#ffffff"
            onMouseEnter={e => this.setUlDisplay(e)}
          />
          <RaisedButton
            label="Play"
            backgroundColor="#AA8899"
            labelColor="#ffffff"
            onClick={e => this.renderVideo()}
          />
          <form action="http://www.last.fm/api/auth ">
            <input
              type="hidden"
              name="api_key"
              value="5df8d91bac81fb9ea65ca73b43ecec62"
            />
            <input
              type="hidden"
              name="cb"
              value="http://localhost:3001/#/login"
            />
            <button type="submit">Scrobbluj TERAZ</button>
          </form>
        </div>
        {this.renderArtistAlbum()}
        {this.state.playVideo
          ? <ShowVideo
              artist={this.props.name}
              videoId={this.state.videoId}
              videoFound={this.state.videoFound}
            />
          : null}
      </StyledArtistTile>
    );
  }
}

class DropdownUl extends Component {
  albumRender = () => {
    if (this.props.albums.albums.album) {
      return this.props.albums.albums.album.map((album, i) => {
        return (
          <ListItem
            className="list-group-item"
            key={i}
            primaryText={album.name}
            leftAvatar={
              <Avatar src={album.image[1]["#text"]} alt="Album Foto" />
            }
          />
        );
      });
    }
  };

  render() {
    const { diplayStyle, albums } = this.props;
    return (
      <AlbumsList display={diplayStyle}>
        {albums.albums.album ? this.albumRender() : false}
      </AlbumsList>
    );
  }
}

const AlbumsList = styled(List)`
          display: ${props => props.display};
          position: absolute;
          top: 0;
          z-index: 2;
          width: 260px;
          height: 380px;
          overflow-y: scroll;
          background-color: #e6e6ff;

`;

const StyledSpan = styled.span`
  font-size: large;
  align-self: center;
`;
const StyledAlbumElement = styled.li`
  display: flex;
  justify-content: space-around;
`;
const StyledArtistTile = styled.div`
  display: inline-block;
  margin: 15px;
  width: 260px;
  height: 380px;
  text-align: left;
  z-index: 1;
  padding: 0;
`;

ArtistTile.propTypes = {
  name: propTypes.string.isRequired,
  img: propTypes.string.isRequired,
  match: propTypes.string.isRequired
};

DropdownUl.propTypes = {
  albums: propTypes.object.isRequired,
  diplayStyle: propTypes.string.isRequired
};
const mapStateToProps = state => {
  return {
    albums: state.albums
  };
};
export default connect(mapStateToProps)(ArtistTile);
