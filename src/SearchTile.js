import React, { Component } from "react";

const axios = require("axios");

class SearchTile extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    console.log("web video link " + this.props.video.viewContentLink);
    console.log(this.props.video);

    var url;
    axios
      .post("http://sdi.myftp.org:81/getDirectLink", this.props.video, {
        withCredentials: true,
        responseType: "json",
        xsrfCookieName: "XSRF-TOKEN",
        xsrfHeaderName: "X-XSRF-TOKEN"
      })
      .then(result => {
        url = result.data.directContentLink;
        console.log("got url: " + url);
      })
      .catch(err => {
        console.log("dupa");
      });

    this.props.changeVideoUrlCallback(url);
  }
  render() {
    return (
      <div className="videoBox">
        <div className="videoBox_filename">{this.props.video.name}</div>
        <div className="videoBox_thumbnail">
          <a href="#" onClick={this.handleClick}>
            <img
              src={this.props.video.thumbnailLink}
              alt={this.props.video.name}
              width="200px"
              height="150px"
              onClick={this.props.handleClick}
            />
          </a>
        </div>{" "}
      </div>
    );
  }
}

class VideoGrid extends Component {
  render() {
    var videos = [];

    this.props.videos.forEach(video => {
      var width = 0;
      var height = 0;
      if (this.props.chosenResolution !== "") {
        width = this.props.resolutions[this.props.chosenResolution].width;
        height = this.props.resolutions[this.props.chosenResolution].height;
      }

      if (
        video.name.indexOf(this.props.filterText) === -1 ||
        (width !== 0 &&
          video.width !== width &&
          height !== 0 &&
          video.height !== height)
      ) {
        return;
      }
      videos.push(
        <Video
          video={video}
          key={video.name}
          changeVideoUrlCallback={this.props.changeVideoUrlCallback}
        />
      );
    });

    return (
      <div>
        <dbody>
          {" "}{videos}{" "}
        </dbody>
      </div>
    );
  }
}

export default VideoGrid;
