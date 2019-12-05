import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "../assets/stylesheets/application.scss";
import App from "./containers/App";

const root = document.getElementById("root");
if (root) {
  ReactDOM.render(
    <BrowserRouter basename={process.env.REPO_NAME}>
      <App />
    </BrowserRouter>,
    root
  );
}
