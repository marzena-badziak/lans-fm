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

const lastfmScrobble = (scrobbleRequest, options) => {
  let request = `http://ws.audioscrobbler.com/2.0/?method=track.scrobble`;
  let requestOptions = "";
  Object.entries(options).forEach(([key, value]) => {
    requestOptions += `&${key}=${value}`;
  });
  request = `${request}${scrobbleRequest}${requestOptions}&api_key=${lastfmKey.api_key}&`;
  console.log(request);
  return request;
};

export { lastfmApi, lastfmKey, lastfmScrobble };
