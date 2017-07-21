import { compose, createStore, combineReducers, applyMiddleware } from "redux";
// import persistState from "redux-localstorage";
import thunk from "redux-thunk";
import persistState from "redux-localstorage"
import similarArtists from "./artists/similar-artists-reducer"
import albums from "./albums/albums-reducer"
import album from "./albums/album-reducer"
import artist from "./albums/artist-reducer"
import session from "./session/session-reducer"

const rootReducer = combineReducers({
  similarArtists: similarArtists,
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
