const initialState = { album: {}, message: "" };

const album = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALBUM_INFO":
      return {
        album: action.payload,
        message: "GOT_ALBUMS"
      };
    case "GET_INFO_ATTEMPT":
      return {
        album: {},
        message: "Getting info"
      };
    case "NO_ALBUM_INFO":
      return {
        album: {},
        message: "no_album"
      };
    default:
      return state;
  }
};

export default album;
