import { compose, createStore, combineReducers, applyMiddleware } from "redux";
import persistState from "redux-localstorage";
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
        message: "",
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
const rootReducer = combineReducers({
  // posts: posts,
  //  counter: counter,
  search: search,
  albums: albums
});

const enhancer = compose(applyMiddleware(thunk));
const store = createStore(rootReducer, {}, enhancer);
export default store;
