const lastfmKey = {
  api_key: "5df8d91bac81fb9ea65ca73b43ecec62",
  secret: "1186a5beaa848cba51f710c4685be2e9"
};

const paramsToURL = (params) => {
  let paramsURL = "";
  Object.entries(params).forEach(([key, value]) => {
    paramsURL += `&${key}=${value}`;
  });
  return paramsURL;
}

const lastfmRequestURLMaker = (requestParams) => {
  let requestURL = `http://ws.audioscrobbler.com/2.0/?`;
  let requestParamsURL = paramsToURL(requestParams);
  const request = `${requestURL}${requestParamsURL}&format=json`;
  return request;
};

export { lastfmRequestURLMaker, lastfmKey};
