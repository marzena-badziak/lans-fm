import { compose, createStore, combineReducers, applyMiddleware } from "redux";
// import persistState from "redux-localstorage";
import thunk from "redux-thunk";

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
        message: "Searching",
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
        message: "There is no artist in Last.fm database",

        artistsSimilar: []
      };

    default:
      return state;
  }
};

const albums = (state = { albums: [] }, action) => {
  switch (action.type) {
    case "SEARCH_ALBUMS":
      return {
        ...state,
        albums: action.payload
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
    message: ""
  },
  action
) => {
  switch (action.type) {
    case "LOGIN_ATTEMPT":
      return {
        ...state,
        message: "Logging in"
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        apiSig: action.apiSig,
        sessionKey: action.sessionKey,
        username: action.username,
        message: 'Logged as'
      };
    case "LOGIN_FAIL":
      return {
        ...state,
        message: "Error"
      };
    case 'USER_LOGOUT':
      return state = undefined

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  search: search,
  albums: albums,
  session: session
});

const enhancer = compose(applyMiddleware(thunk));
const store = createStore(rootReducer, {}, enhancer);
export default store;
