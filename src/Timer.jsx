import React from "react";

const Timer = (props) => {
  return (
    <div>
      <h1>Timer</h1>
      <TimerBoard hh={props.hh} mm={props.mm} ss={props.ss} />
      <TimerButton
        onClickReset={props.onClickReset}
        onClickStart={props.onClickStart}
        onClickWait={props.onClickWait}
      />
    </div>
  );
};

const TimerBoard = (props) => {
  return (
    <div className="timerBoard">{`${props.hh}:${props.mm}:${props.ss}`}</div>
  );
};

const TimerButton = (props) => {
  let clicks = 0;
  function doubleClick() {
    clicks++;
    if (clicks === 2) {
      setTimeout(props.onClickWait(), 300);
    }
    setTimeout(() => {
      clicks = 0;
    }, 350);
  }
  return (
    <div className="buttonBlock">
      <button onClick={() => props.onClickStart()}>Start/Stop</button>
      <button onClick={() => doubleClick()}>Wait(dbClick)</button>
      <button onClick={() => props.onClickReset()}>Reset</button>
    </div>
  );
};

export default Timer;
