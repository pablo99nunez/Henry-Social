import React from "react";
import ReactDOM from "react-dom";
import "./Styles/index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../src/redux/store/index";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.PROD
  ? "https://henry-social-back.herokuapp.com"
  : "http://localhost:3001";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
