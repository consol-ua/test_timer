import React from "react";
import { interval } from "rxjs";
import { takeWhile } from "rxjs/operators";
import "./styles.css";
import Timer from "./Timer";

export default class TimerContainer extends React.Component {
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

  dateNow(offSet) {
    let dateNow = Date.now();
    let tickTime = dateNow - this.state.dateStartTimer;
    let time = this.state.time < tickTime ? tickTime : offSet + tickTime;
    let hhmmss = this.msToTime(time);
    this.setState({ time, ...hhmmss, tickTime, offSet });
  }
  resetTimer() {
    this.setState({ ...this._defaultState, dateStartTimer: Date.now() });
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
  waitTimer() {
    if (this.state.isStarted && !this.state.isWait) {
      this.setState({
        isWait: true,
        isStarted: false
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

  render() {
    return (
      <div className="App">
        <Timer
          hh={this.state.hh}
          mm={this.state.mm}
          ss={this.state.ss}
          onClickReset={this.resetTimer}
          onClickStart={this.startTimer}
          onClickWait={this.waitTimer}
        />
      </div>
    );
  }
}
