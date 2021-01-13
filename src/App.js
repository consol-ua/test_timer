import React from "react";
import "./styles.css";

const TimerWrapper = (props) => {
  return <div>{`${props.hh}:${props.mm}:${props.ss}`}</div>;
};

const TimerButton = () => {
  return (
    <div className="buttonBlock">
      <button>Start/Stop</button>
      <button>Wait</button>
      <button>Reset</button>
    </div>
  );
};

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Timer</h1>
        <TimerWrapper hh="02" mm="01" ss="13" />
        <TimerButton />
      </div>
    );
  }
}
