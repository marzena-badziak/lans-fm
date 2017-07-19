import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

const AppWithStore = (
  <MuiThemeProvider>
    <Provider store={store}>
      <App store={store} />
    </Provider>
  </MuiThemeProvider>
);

ReactDOM.render(AppWithStore, document.getElementById("root"));
registerServiceWorker();
