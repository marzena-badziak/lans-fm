import React, { Component } from "react";
import Navbar from "./user-interface/Navbar";
import styled from "styled-components";

class Layout extends Component {
  render() {
    return (
      <div>
        <div>
          <Navbar />
          <StyledContentContainer>
            {this.props.children}
          </StyledContentContainer>
        </div>
      </div>
    );
  }
}
const StyledContentContainer = styled.div`
  background-color: rgba(255, 255, 255, .7);
  margin: 0;
  padding: 5px;
`;

export default Layout;
