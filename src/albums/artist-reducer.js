const initialState = { artist: {}, message: "" };

const artist = (state = initialState, action) => {
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

export default artist;
