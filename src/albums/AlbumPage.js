import React, { Component } from "react";

class AlbumPage extends Component {
  render() {
    return (
      <div>
        {console.log(this.props.params)}
        {this.props.params.AritstName}
        {this.props.params.albumName}
      </div>
    );
  }
}

export default AlbumPage;
