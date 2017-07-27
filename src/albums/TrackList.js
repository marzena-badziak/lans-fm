import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";

class TrackList extends Component {
  handleClickOutside = e => {
    this.props.closeMenu();
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
