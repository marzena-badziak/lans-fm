import React, { Component } from "react";
import { getAlbumInfo } from "../artists/search-actions.js";
import { connect } from "react-redux";
import { List, ListItem } from "material-ui/List";
import Paper from "material-ui/Paper";
import Avatar from "material-ui/Avatar";
import CircularProgress from "material-ui/CircularProgress";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import FlatButton from "material-ui/FlatButton";
import Toggle from "material-ui/Toggle";

class AlbumPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetched: false,
      open: {3:true}
    };
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
      return this.props.album.album.tracks.track.map((track, i) => {
        return (
          <ListItem
            primaryText={track.name}
            key={i}
          //  onClick={(e)=>this.setState({ open:{i : !this.state.open[i]} })}
          //  open={this.state.open[i]}
            nestedItems={[
              <ListItem><FlatButton label="Scrobble" /></ListItem>,
              <ListItem><FlatButton label="Scrobble" /></ListItem>,
              <ListItem><FlatButton label="Scrobble" /></ListItem>
            ]}
          />
        );
      });
    } else {
      return <CircularProgress />;
    }
  }
  render() {
    return (
      <div className="container">
        <Paper>
          {this.props.album.message === "GOT_ALBUMS"
            ? <Avatar
                src={this.props.album.album.image[2]["#text"]}
                size={150}
              />
            : false}
          <List>
            {this.showTracks()}
          </List>
        </Paper>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    album: state.album
  };
};
export default connect(mapStateToProps)(AlbumPage);
