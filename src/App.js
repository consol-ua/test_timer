import React from "react";
import "./styles.css";

const TimerWrapper = (props) => {
  return (
    <div className="timerBoard">{`${props.hh}:${props.mm}:${props.ss}`}</div>
  );
};

const TimerButton = (props) => {
  return (
    <div className="buttonBlock">
      <button onClick={() => props.onClickStart()}>Start/Stop</button>
      <button onClick={() => props.testButton()}>Wait</button>
      <button onClick={() => props.onClickReset()}>Reset</button>
    </div>
  );
};

export default class App extends React.Component {
  state = {
    dateNow: null,
    dateStartTimer: null,
    hh: "01",
    mm: "01",
    ss: "01",
    isStarted: true,
    isWait: false
  };
  constructor(props) {
    super(props);
    this.resetTimer = this.resetTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.updateBoard = this.updateBoard.bind(this);
  }

  resetTimer() {
    const defaultTime = {
      hh: "00",
      mm: "00",
      ss: "00"
    };
    this.setState(defaultTime);
  }
  dateNow() {
    let dateNow = Date.now();
    this.setState({ dateNow });
  }
  startTimer() {
    if (this.state.isStarted) {
      this.setState({
        isStarted: false
      });
    }
    this.dateNow();
    this.setState({ isStarted: true });
  }
  updateBoard(hh, mm, ss) {
    // function msToTime(duration) {
    //   let milliseconds = parseInt((duration % 1000) / 100),
    //     seconds = parseInt((duration / 1000) % 60),
    //     minutes = parseInt((duration / (1000 * 60)) % 60),
    //     hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    //   hours = hours < 10 ? "0" + hours : hours;
    //   minutes = minutes < 10 ? "0" + minutes : minutes;
    //   seconds = seconds < 10 ? "0" + seconds : seconds;

    //   return { hh: hours, mm: minutes, ss: seconds };
    // }
    if (this.state.isStarted) {
      let timerDate = this.state.dateNow - this.state.dateStartTimer;
      console.log(timerDate);
      console.log(this.state);
    }
  }

  render() {
    // console.log(this.state);
    return (
      <div className="App">
        <h1>Timer</h1>
        <TimerWrapper
          hh={this.state.hh}
          mm={this.state.mm}
          ss={this.state.ss}
        />
        <TimerButton
          onClickReset={this.resetTimer}
          onClickStart={this.startTimer}
          testButton={this.updateBoard}
        />
      </div>
    );
  }
}
