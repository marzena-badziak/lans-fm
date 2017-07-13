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
        artistsSimilar: null
      }
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  // posts: posts,
  //  counter: counter,
  search: search
});

const enhancer = compose(applyMiddleware(thunk));
const store = createStore(rootReducer, {}, enhancer);
export default store;
