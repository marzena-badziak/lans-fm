const session = (
  state = {
    apiSig: "",
    sessionKey: "",
    username: "",
    message: "",
    token: ""
  },
  action
) => {
  switch (action.type) {
    case "LOGIN_ATTEMPT":
      return {
        ...state,
        message: "Trying to log in"
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        apiSig: action.apiSig,
        sessionKey: action.sessionKey,
        username: action.username,
        token: action.token,
        message: "Logged as: "
      };
    case "LOGIN_FAIL":
      return {
        ...state,
        message: "Error"
      };
    case "USER_LOGOUT":
      return {
         ...state,
         sessionKey: "",
         massage: "Logged out"
       };
    default:
      return state;
  }
};

export default session;
