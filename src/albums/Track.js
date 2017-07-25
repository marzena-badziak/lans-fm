import React, { Component } from "react";
import FontAwesome from "react-fontawesome";
import styled from "styled-components";
import Divider from "material-ui/Divider";
import moment from "moment";
import { connect } from "react-redux";
import { List, ListItem } from "material-ui/List";
import { scrobbleSingleTrack } from "./scrobble-album.js";
import PropTypes from "prop-types";

class Track extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: "none",
      isScrobbled: false
    };
  }

  changeDropdownState = e => {
    this.props.openMenu(this.props.i, e.nativeEvent.pageX, e.nativeEvent.pageY);
  };

  scrobbleTrack = e => {
    if(this.props.session.sessionKey === ""){
      alert("You are not logged on last.fm, please login and try again.");
      return;
    }
    scrobbleSingleTrack({
      session: this.props.session,
      track: this.props.track
    })
    this.setState ({
      isScrobbled: true
    })
    this.props.openMenu(this.props.i, 0, 0);
  };

  closeScrobbleInfo = e => {
    this.setState ({
      isScrobbled: false
    })
  }

  scrobbleInfo = () => {
    if(this.state.isScrobbled === false) {
      return "";
    } else {
      return (
        <div className="alert alert-success" role="alert">
          Scrobbled
          <button type="button" className="close" ariaLabel="Close" onClick={this.closeScrobbleInfo}><span ariaHidden="true">&times;</span></button>
        </div>
      );
    }
  }

  render() {
    return (
      <div key={this.props.i}>
        {this.scrobbleInfo()}
        <ListItem
          primaryText={`${this.props.i + 1}. ${this.props.track.name}`}
          onClick={e => this.changeDropdownState(e)}
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
            display: `${this.props.open}`,
            position: "absolute",
            left: `${this.props.left}px`,
            top: `${this.props.top}px`,
            zIndex: "10",
            boxShadow: "0px 0px 30px 3px rgba(0, 0, 0, 0.6)",
            padding: "0px"
          }}
        >
          <DropDownHeader>
            {this.props.artist} - {this.props.track.name}
          </DropDownHeader>
          <Divider />
          <StyledDropDownItem onClick={() => this.scrobbleTrack()}>
            {" "}<FontAwesome
              className="fa fa-lastfm"
              name="options"
              size="lg"
              aria-hidden="true"
            />
            {"  "}
            Scrobble
          </StyledDropDownItem>
          <Divider />
          <StyledDropDownItem>
            <a
              href={`https://www.youtube.com/results?search_query=${this.props
                .artist}+${this.props.track.name}`}
              target="blank"
            >
              {" "}<FontAwesome
                className="fa fa-youtube"
                name="options"
                size="lg"
                aria-hidden="true"
              />
              {"  "}
              Youtube
            </a>
          </StyledDropDownItem>
          <Divider />
          <StyledDropDownItem>
            <a
              href={`https://open.spotify.com/search/results/${this.props
                .artist} ${this.props.track.name}`}
              target="blank"
            >
              {" "}<FontAwesome
                className="fa fa-spotify"
                name="options"
                size="lg"
                aria-hidden="true"
              />
              {"  "}
              Spotify
            </a>
          </StyledDropDownItem>
        </List>
      </div>
    );
  }
}
const DropDownHeader = styled.li`
  list-style-type: none;
  padding: 15px;
  background: #ffe0ee;
  z-index: 10;
  cursor: pointer;
  &:hover {
    background: #ffe0ee;
    opacity: 1;
  }
`;
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
    session: state.session
  };
};
Track.propTypes = {
  track: PropTypes.object.isRequired,
  i: PropTypes.number.isRequired,
  left: PropTypes.number,
  top: PropTypes.number
};

export default connect(mapStateToProps)(Track);
