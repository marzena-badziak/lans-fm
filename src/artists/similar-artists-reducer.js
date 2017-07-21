const similarArtists = (
  state = {
    artistEntered: "",
    artistsSimilar: [],
    message: ""
  },
  action
) => {
  switch (action.type) {
    case "SEARCH_ARTIST_ATTEMPT":
      return {
        ...state,
        message: "Searching: ",
        artistEntered: action.artistEntered,
        artistsSimilar: []
      };
    case "SEARCH_ARTIST_SUCCESS":
      return {
        ...state,
        message: "Search results for: ",
        artistsSimilar: action.artistsSimilar
      };
    case "SEARCH_ARTIST_FAIL":
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

export default similarArtists;
