const session = (
  state = {
    apiSig: "",
    sessionKey: "",
    username: "",
    message: "",
    token: "",
    spotifyAccessToken: "",
    spotifyExpiresIn: "",
    spotifyRefreshToken: "",
    spotifyStateString: "",
    currentPath: ""
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
    case "SAVE_CURRENT_PATH":
      return {
        ...state,
        currentPath: action.currentPath
      };
    case "SPOTIFY_GENERATE_STATE":
      return {
        ...state,
        spotifyStateString: action.spotifyStateString
      };
    case "SPOTIFY_LOGIN_ATTEMPT":
      return {
        ...state,
        message: "Trying to log in to Spotify"
      };
    case "SPOTIFY_LOGIN":
      return {
        ...state,
        spotifyAccessToken: action.spotifyAccessToken,
        spotifyExpiresIn: action.spotifyExpiresIn,
        spotifyRefreshToken: action.spotifyRefreshToken
      };
    default:
      return state;
  }
};

export default session;
