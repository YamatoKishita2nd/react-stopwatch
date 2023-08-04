import logo from './logo.svg';
import './App.css';

import React, { useState, useRef } from 'react';

let splitTime = 0;
let splitTimeStore = 0;

function getDisplayTime(time) {
  const minutes = `0${Math.floor(time / 60000) % 60}`.slice(-2);
  const seconds = `0${Math.floor(time / 1000) % 60}`.slice(-2);
  const milliseconds = `0${(time % 1000) / 10}`.slice(-2);

  return [minutes, seconds, milliseconds];
}

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const lapTableBody = document.querySelector('.App-lap-table tbody');

  function lap() {
    let lapNumber = lapTableBody.childElementCount + 1;

    splitTime = time - splitTimeStore;
    splitTimeStore = time;

    const displaySplitTime = getDisplayTime(splitTime);
    const displaySumTime = getDisplayTime(time);

    lapTableBody.insertAdjacentHTML('afterbegin', '<tr><td>ラップ' + lapNumber + '</td><td>' + displaySplitTime[0] + ':' + displaySplitTime[1] + '.' + displaySplitTime[2] + '</td><td>' + displaySumTime[0] + ':' + displaySumTime[1] + '.' + displaySumTime[2] + '</td></tr>');
  }

  function reset() {
    if (time === 0) {
      return;
    }

    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
    lapTableBody.innerHTML = '';
    splitTime = 0;
    splitTimeStore = 0;
  }

  function stop() {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  }

  function start() {
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime(time => time + 10);
    }, 10);
  }

  const displayTime = getDisplayTime(time);

  return (
    <div className='App'>
      <h1 className='App-title'>ストップウォッチ</h1>
      <h1 className='App-time'>{displayTime[0]}:{displayTime[1]}.{displayTime[2]}</h1>
      <div className='App-lap'>
        <table className='App-lap-table'>
          <thead>
            <tr>
              <th>ラップ数</th>
              <th>スプリット</th>
              <th>合計</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
      {isRunning ? (
        <button onClick={lap} className='App-button App-button-lap'>ラップ</button>
      ) : (
        <button onClick={reset} className='App-button App-button-reset'>リセット</button>
      )}
      {isRunning ? (
        <button onClick={stop} className='App-button App-button-stop'>ストップ</button>
      ) : (
        <button onClick={start} className='App-button App-button-start'>スタート</button>
      )}
    </div>
  );
}

export default App;
