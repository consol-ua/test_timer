import React from "react";
import ReactDOM from "react-dom";

import TimerContainer from "./TimerContainer";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <TimerContainer />
  </React.StrictMode>,
  rootElement
);
