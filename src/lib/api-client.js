import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://praktyki-react.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});

const configureApi = store => {
  apiClient.interceptors.request.use(
    function (config) {
      console.log(store.getState(), config);
      const state = store.getState();
      if (state.session.token) {
        config.headers["X-User-Email"] = state.session.username;
        config.headers["X-User-Token"] = state.session.token;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
};

export {
  configureApi
};
export default apiClient;
