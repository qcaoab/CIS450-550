import "@babel/polyfill";

import React from "react";
import { render } from "react-dom";

import App from "./components/App";
import store from "./redux/store";
import { Provider } from "react-redux";
render(
  <Provider store={store}>
    {console.log(store)}
    <App />
  </Provider>,
  document.querySelector("#root")
);
