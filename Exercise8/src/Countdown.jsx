import React, { useEffect, useState } from "react";
import "./Countdown.css";

const Countdown = () => {
  const [inputTime, setInputTime] = useState(10);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timerId;

    if (isRunning && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0) {
      setIsRunning(false);
    }

    return () => clearInterval(timerId);
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(Number(inputTime));
  };

  const handleInputChange = (event) => {
    const value = event.target.value;

    setInputTime(value);

    if (!isRunning) {
      setTimeLeft(Number(value));
    }
  };

  return (
    <div className="countdown">
      <h1>Countdown Timer</h1>

      <div className="input-section">
        <label>Set Time (seconds):</label>

        <input
          type="number"
          value={inputTime}
          onChange={handleInputChange}
          min="1"
        />
      </div>

      <p className="time-left">
        Time Left: {timeLeft} seconds
      </p>

      <div className="buttons">
        <button
          onClick={handleStart}
          disabled={isRunning || timeLeft === 0}
        >
          Start
        </button>

        <button
          onClick={handleStop}
          disabled={!isRunning}
        >
          Stop
        </button>

        <button onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Countdown;