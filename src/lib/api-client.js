import axios from "axios";

var apiClient = axios.create({
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

export { configureApi };
export default apiClient;
