// co ma robic ten plik??

// zbedny komentarz
// import axios from "axios";

const lastfmKey = {
  api_key: "5df8d91bac81fb9ea65ca73b43ecec62",
  secret: "1186a5beaa848cba51f710c4685be2e9"
};
// zbedny komentarz
//    `http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${artist.artist}&api_key=${lastfmKey.api_key}&limit=15&format=json`

const lastfmApi = (method, options) => {
  let request = `http://ws.audioscrobbler.com/2.0/?method=${method}`;
  Object.entries(options).forEach(([key, value]) => {
    request = `${request}&${key}=${value}`;
  });
  request = `${request}&api_key=${lastfmKey.api_key}&format=json`;
  return request;
};
// zbedne komentarz
/*var apiClient = axios.create({
  baseURL: "http://ws.audioscrobbler.com/2.0/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});

const configureApi = store => {
  apiClient.interceptors.request.use(
    function(config) {
      const state = store.getState();
      return config;
    },
    function(error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
};

export { configureApi };*/
export { lastfmApi, lastfmKey };
export default lastfmApi;
