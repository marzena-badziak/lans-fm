import { compose, createStore, combineReducers, applyMiddleware } from "redux";
import persistState from "redux-localstorage";
import thunk from "redux-thunk";

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
        message: "Zalogowano jako"
      };
    case "LOGIN_FAIL":
      return {
        ...state,
        message: "Blad"
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
  albums: albums,
  session: session
});

const enhancer = compose(applyMiddleware(thunk));
const store = createStore(rootReducer, {}, enhancer);
export default store;
