import { compose, createStore, combineReducers, applyMiddleware } from "redux";
// import persistState from "redux-localstorage";
import thunk from "redux-thunk";
import persistState from "redux-localstorage"

const search = (
  state = {
    artistEntered: "",
    artistsSimilar: [],
    message: ""
  },
  action
) => {
  switch (action.type) {
    case "SEARCH_ATTEMPT":
      return {
        ...state,
        message: "Searching: ",
        artistEntered: action.artistEntered
      };
    case "SEARCH_SUCCESS":
      return {
        ...state,
        message: "Search results for: ",
        artistsSimilar: action.artistsSimilar
      };
    case "SEARCH_FAIL":
      return {
        ...state,
        message: "Error"
      };

    case "SEARCH_NO_ARTIST":
      return {
        ...state,
        message: "No such artist in Last.fm database",

        artistsSimilar: []
      };

    default:
      return state;
  }
};

const albums = (state = { albums: [], message: "" }, action) => {
  switch (action.type) {
    case "SEARCH_ALBUMS_ATTEMPT":
      return {
        albums: [],
        message: "Searching"
      };
    case "SEARCH_ALBUMS":
      return {
        ...state,
        message: "Found albums",
        albums: action.payload
      };
    case "NO_ALBUMS":
      return {
        message: "Doesn't have any albums",
        albums: []
      };
    default:
      return state;
  }
};
const album = (state = { album: {}, message: "" }, action) => {
  switch (action.type) {
    case "GET_ALBUM_INFO":
      return {
        album: action.payload,
        message: "GOT_ALBUMS"
      };
    case "GET_INFO_ATTEMPT":
      return {
        album: [],
        message: "Getting info"
      };
    default:
      return state;
  }
};

const artist = (state = { artist: {}, message: "" }, action) => {
  switch (action.type) {
    case "GET_ARTIST_INFO":
      return {
        artist: action.payload,
        message: "Got_artist"
      };
    case "GET_ARTIST_INFO_ATTEMPT":
      return {
        artist: {},
        message: "Getting info"
      };
    default:
      return state;
  }
};

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
        message: "Blad"
      };
    case "USER_LOGOUT":
      return (state = undefined);

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  search: search,
  albums: albums,
  album: album,
  session: session,
  artist: artist
});

const enhancer = compose(
  applyMiddleware(thunk),
  persistState("session")
);

const store = createStore(rootReducer, {}, enhancer);
export default store;
