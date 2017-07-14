import React, { Component } from "react";
import styled from "styled-components";
import Navbar from "./user-interface/Navbar";

class Layout extends Component {
  render() {
    return (
      <div>
        <div>
          <Navbar />

          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Layout;
