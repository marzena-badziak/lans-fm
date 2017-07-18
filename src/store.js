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
        message: "Trwa wyszukiwanie",
        artistEntered: action.artistEntered
      };
    case "SEARCH_SUCCESS":
      return {
        ...state,
        message: "Wyniki wyszukiwania dla: ",
        artistsSimilar: action.artistsSimilar
      };
    case "SEARCH_FAIL":
      return {
        ...state,
        message: "Blad"
      };

    case "SEARCH_NO_ARTIST":
      return {
        ...state,
        message: "Brak Artysty w bazie Last.fm",

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
        message: "",
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
const album = (state = { album: {} }, action) => {
  switch (action.type) {
    case "GET_ALBUM_INFO":
      return {
        album: action.payload
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
        message: "Trwa logowanie"
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        apiSig: action.apiSig,
        sessionKey: action.sessionKey,
        username: action.username,
        message: 'Zalogowano jako'
      };
    case "LOGIN_FAIL":
      return {
        ...state,
        message: "Blad"
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
  album: album,
  session: session
});

const enhancer = compose(applyMiddleware(thunk));
const store = createStore(rootReducer, {}, enhancer);
export default store;
