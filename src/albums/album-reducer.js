const album = (state = { album: {}, message: "" }, action) => {
  switch (action.type) {
    case "GET_ALBUM_INFO":
      return {
        album: action.payload,
        message: "GOT_ALBUMS"
      };
    case "GET_INFO_ATTEMPT":
      return {
        album: [],
        message: "Getting info"
      };
    default:
      return state;
  }
};

export default album;
