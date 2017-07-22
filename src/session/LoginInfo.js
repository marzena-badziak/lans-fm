import React, { Component } from "react";
import FlatButton from "material-ui/FlatButton";
import { connect } from "react-redux";

class LoginInfo extends Component {
  logOut = () => {
    this.props.dispatch({
      type: "USER_LOGOUT"
    });
  };

  loginInfo = () => {
    if (this.props.session.sessionKey === "") {
      return (
        <form action="http://www.last.fm/api/auth ">
          <input
            type="hidden"
            name="api_key"
            value="5df8d91bac81fb9ea65ca73b43ecec62"
          />
          <input
            type="hidden"
            name="cb"
            value={`http://localhost:3000/?currentUrl=${this.props
              .currentPageParams}/login`}
          />
          <FlatButton
            type="submit"
            label="Login"
            labelStyle={{
              color: "white",
              fontWeight: "700",
              marginRight: "8px"
            }}
          />
        </form>
      );
    } else {
      return (
        <FlatButton
          label="Logout"
          labelStyle={{
            color: "white",
            fontWeight: "700",
            marginRight: "8px"
          }}
          onClick={() => this.logOut()}
        />
      );
    }
  };

  render() {
    return (
      <span>
        {this.loginInfo()}
      </span>
    );
  }
}

const mapStateToProps = state => {
  return {
    session: state.session
  };
};

export default connect(mapStateToProps)(LoginInfo);
