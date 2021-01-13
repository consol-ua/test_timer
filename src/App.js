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
      <button onDoubleClick={() => props.testButton()}>Wait</button>
      <button onClick={() => props.onClickReset()}>Reset</button>
    </div>
  );
};

export default class App extends React.Component {
  _defaultState = {
    hh: "00",
    mm: "00",
    ss: "00",
    dateStartTimer: 0,
    // isWait: false,
    time: 0
  };
  state = {
    ...this._defaultState
  };
  constructor(props) {
    super(props);
    this.resetTimer = this.resetTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.updateBoard = this.updateBoard.bind(this);
    this.dateNow = this.dateNow.bind(this);
  }

  resetTimer() {
    this.setState({ ...this._defaultState, dateStartTimer: Date.now() });
    console.log(this.state);
  }
  dateNow() {
    let dateNow = Date.now();
    let time =
      this.state.time < dateNow - this.state.dateStartTimer
        ? dateNow - this.state.dateStartTimer
        : this.state.time + (dateNow - this.state.dateStartTimer);
    let hhmmss = this.msToTime(time);
    this.setState({ time, ...hhmmss });

    console.log(this.state);
  }
  startTimer() {
    if (this.state.isStarted) {
      clearInterval(this.state.tick);
      this.setState({
        ...this._defaultState,
        isStarted: false
      });
      console.log("this.state.isStarted");
    } else if (!this.state.isStarted && this.state.isWait) {
      debugger;
      this.setState({
        isWait: false,
        isStarted: true,
        dateStartTimer: Date.now(),
        tick: setInterval(() => this.dateNow(), 1000)
      });
      console.log("!this.state.isStarted && this.state.isWait");
    } else {
      this.setState({
        isStarted: true,
        dateStartTimer: Date.now(),
        tick: setInterval(() => this.dateNow(), 1000)
      });
      console.log("start");
    }
  }
  msToTime(duration) {
    let seconds = parseInt((duration / 1000) % 60),
      minutes = parseInt((duration / (1000 * 60)) % 60),
      hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return { hh: hours, mm: minutes, ss: seconds };
  }
  updateBoard() {
    if (this.state.isStarted && !this.state.isWait) {
      clearInterval(this.state.tick);
      this.setState({
        isWait: true,
        isStarted: false
      });
    }
    console.log(this.state);
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
