// czym rozni sie albums-reducer od album-reducer?
const albums = (state = { albums: [], message: "" }, action) => {
  switch (action.type) {
    case "SEARCH_ALBUMS_ATTEMPT":
      return {
        albums: [],
        message: "Searching",
      };
    case "SEARCH_ALBUMS":
      return {
        ...state,
        message: "Found albums",
        albums: action.payload,
      };
    case "NO_ALBUMS":
      return {
        message: "Doesn't have any albums",
        albums: [],
      };
    default:
      return state;
  }
};

export default albums;
