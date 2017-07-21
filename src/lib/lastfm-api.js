const lastfmKey = {
  api_key: "5df8d91bac81fb9ea65ca73b43ecec62",
  secret: "1186a5beaa848cba51f710c4685be2e9"
};
//    `http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${artist.artist}&api_key=${lastfmKey.api_key}&limit=15&format=json`

const lastfmRequestURLMaker = (requestParams) => {
  let requestURL = `http://ws.audioscrobbler.com/2.0/?`;
  let requestParamsURL = ""
  Object.entries(requestParams).forEach(([key, value]) => {
    requestParamsURL += `&${key}=${value}`;
  });
  const request = `${requestURL}${requestParamsURL}&format=json`;
  return request;
};

export { lastfmRequestURLMaker, lastfmKey};
