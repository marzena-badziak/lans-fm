import React, { Component } from "react";
import styled from "styled-components";
import Navbar from "./user-interface/Navbar";

class Layout extends Component {
  render() {
    console.log(this.props.children);
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

const StyledDiv = styled.div`margin-top: 60px;`;
export default Layout;
