const lastfmKey = {
  api_key: "5df8d91bac81fb9ea65ca73b43ecec62",
  secret: "1186a5beaa848cba51f710c4685be2e9"
};
//    `http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${artist.artist}&api_key=${lastfmKey.api_key}&limit=15&format=json`

const lastfmApi = (method, options) => {
  let request = `http://ws.audioscrobbler.com/2.0/?method=${method}`;
  Object.entries(options).forEach(([key, value]) => {
    request = `${request}&${key}=${value}`;
  });
  request = `${request}&api_key=${lastfmKey.api_key}&format=json`;
  return request;
};

const lastfmRequestURLMaker = (scrobbleRequest) => {
  let requestURL = `http://ws.audioscrobbler.com/2.0/?`;
  let requestOptions = ""
  Object.entries(scrobbleRequest).forEach(([key, value]) => {
    requestOptions += `&${key}=${value}`;
  });
  const request = `${requestURL}${requestOptions}`;
  console.log("requestURL: " + requestURL);
  console.log("scrobbleRequest: " + scrobbleRequest);
  console.log("requestOptions: " + requestOptions);
  console.log(request);
  return request;
};

export { lastfmApi, lastfmKey, lastfmRequestURLMaker };
