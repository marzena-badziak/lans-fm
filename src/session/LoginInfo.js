import React, { Component } from "react";
import FlatButton from "material-ui/FlatButton";
import { connect } from "react-redux";
import { lastfmKey } from "../lib/lastfm-api";

class LoginInfo extends Component {

  logOut = () => {
    console.log("Jestem tu")
    //this.props.dispatch({
    //  type: "USER_LOGOUT"
    //});
  }

  loginInfo = () => {
    console.log(this.props.session);
    if (this.props.session.sessionKey === null) {
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
            value="http://localhost:3000/#/login"
          />
          <FlatButton type="submit" label="Login" />
        </form>
     );
    } else {
      return <FlatButton onClick={() => this.logOut}  label="Logout" />;
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
