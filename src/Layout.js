import React, { Component } from "react";
import styled from "styled-components";
import Navbar from "./user-interface/Navbar";

class Layout extends Component {
  render() {
    return (
      <StyledDiv>
        <div>
          <Navbar />

          {this.props.children}
        </div>
      </StyledDiv>
    );
  }
}

const StyledDiv = styled.div``;
export default Layout;
