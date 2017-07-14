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

<<<<<<< HEAD
const StyledDiv = styled.div``;
=======
>>>>>>> b1d1e9269d438b8a4873b16ac8d549ef4073685c
export default Layout;
