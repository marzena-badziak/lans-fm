import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";
// co tu sie dzieje?
class TrackList extends Component {
  handleClickOutside = e => {
    this.props.openMenu(null, 0, 0, true);
  };
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default onClickOutside(TrackList);
