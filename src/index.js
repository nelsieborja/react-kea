import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { getContext, resetContext } from "kea";

import App from "./app";

resetContext();

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={getContext().store}>
    <App />
  </Provider>,
  rootElement
);
