import React from "react";
import { interval } from "rxjs";
import { takeWhile } from "rxjs/operators";
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
      <button onDoubleClick={() => props.onClickWait()}>Wait(dbClick)</button>
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
    time: 0,
    stream: interval(1000).pipe(takeWhile(() => this.state.isStarted))
  };
  state = {
    ...this._defaultState
  };
  constructor(props) {
    super(props);
    this.resetTimer = this.resetTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.waitTimer = this.waitTimer.bind(this);
  }

  resetTimer() {
    this.setState({ ...this._defaultState, dateStartTimer: Date.now() });
  }
  dateNow(offSet) {
    let dateNow = Date.now();
    let tickTime = dateNow - this.state.dateStartTimer;
    let time = this.state.time < tickTime ? tickTime : offSet + tickTime;
    let hhmmss = this.msToTime(time);
    this.setState({ time, ...hhmmss, tickTime, offSet });
  }
  startTimer() {
    if (this.state.isStarted) {
      this.setState({
        ...this._defaultState,
        isStarted: false
      });
    } else if (!this.state.isStarted && this.state.isWait) {
      let offSetTime = this.state.time;
      this.setState({
        isWait: false,
        isStarted: true,
        dateStartTimer: Date.now(),
        tick: this.state.stream.subscribe((e) => this.dateNow(offSetTime))
      });
    } else {
      this.setState({
        isStarted: true,
        dateStartTimer: Date.now(),
        tick: this.state.stream.subscribe((e) => this.dateNow())
      });
    }
  }
  msToTime(duration) {
    let seconds = parseInt((duration / 1000) % 60, 10),
      minutes = parseInt((duration / (1000 * 60)) % 60, 10),
      hours = parseInt((duration / (1000 * 60 * 60)) % 24, 10);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return { hh: hours, mm: minutes, ss: seconds };
  }
  waitTimer() {
    if (this.state.isStarted && !this.state.isWait) {
      this.setState({
        isWait: true,
        isStarted: false
      });
    }
  }

  render() {
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
          onClickWait={this.waitTimer}
        />
      </div>
    );
  }
}
