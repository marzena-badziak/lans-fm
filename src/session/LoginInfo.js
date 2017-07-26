import React, { Component } from "react";
import FlatButton from "material-ui/FlatButton";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";

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
            value={`http://localhost:3000/login`}
          />
          <FlatButton
            type="submit"
            label="Login to last.fm"
            labelStyle={{
              color: "white",
              fontWeight: "700",
              marginRight: "0"
            }}
          />
        </form>
      );
    } else {
      return (
        <div>
          <MediaQuery query="(min-width: 481px)">
            <FlatButton
              label={`Hi, ${this.props.session.username}`}
              labelStyle={{
                color: "white",
                fontWeight: "700",
                marginRight: "0",
                padding: "5px"
              }}
              onClick={() => this.logOut()}
            />
          </MediaQuery>
          <MediaQuery query="(max-width: 480px)">
            <FlatButton
              label={`Hi, ${this.props.session.username}`}
              labelStyle={{
                color: "white",
                fontWeight: "700",
                marginRight: "-20px",
                padding: "5px"
              }}
              onClick={() => this.logOut()}
            />
          </MediaQuery>
        </div>
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
