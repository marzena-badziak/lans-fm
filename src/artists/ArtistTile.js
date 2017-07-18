import React, { Component } from "react";
import styled from "styled-components";
import propTypes from "prop-types";
import { searchArtist } from "./search-actions";
import { connect } from "react-redux";
import axios from "axios";
import RaisedButton from "material-ui/RaisedButton";
import ShowVideo from "./ShowVideo";
import { withRouter } from "react-router";

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
  getAlbums = e => {
    e.preventDefault();
    this.props.router.push(`${this.props.name}/albums`);
  };
  playVideo = () => {
    var searchRequest =
      "https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&q=" +
      this.props.name +
      "+VEVO" +
      "&type=video&key=AIzaSyBdXp1WnmYGXXuDFybXxK_94awGD5Qm-Zw";
    console.log(searchRequest);
    this.getYoutubeVideoId(searchRequest);
  };

  getYoutubeVideoId = searchRequest => {
    axios
      .get(searchRequest)
      .then(response => {
        this.setState({
          videoId: response.data.items[0].id.videoId,
          playVideo: true,
          videoFound: true
        });

        var ytTitle = response.data.items[0].snippet.title;
        console.log(ytTitle);

        const getArtistTitle = require("get-artist-title");

        const [artist, title] = getArtistTitle(ytTitle, {
          defaultArtist: response.data.items[0].snippet.channelTitle
        });
        console.log("artist: " + artist);
        console.log("title: " + title);
      })
      .catch(err => {
        this.setState({ playVideo: true, videoFound: false });
        console.log("videoFound: " + this.state.videoFound);
      });
  };

  hideAlbums = e => {
    this.setState({
      dropDownDisplay: "none"
    });
  };
  render() {
    return (
      <StyledArtistTile
        className="col-xs-4 col-md-3"
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
            onClick={e => this.getAlbums(e)}
          />
          <RaisedButton
            label="Play"
            backgroundColor="#AA8899"
            labelColor="#ffffff"
            onClick={e => this.playVideo()}
          />
        </div>
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

export default connect()(withRouter(ArtistTile));
