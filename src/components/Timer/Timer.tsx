import { useEffect, useState } from "react";
import styles from "./Timer.module.scss";

interface ITimerProps {
  onSave: (elapsedTime: number) => void;
  listDoingLength: number;
}

export default function Timer({ onSave, listDoingLength }: ITimerProps) {
  const [timer, setTimer] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    if (timer) {
      const interval = window.setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleStartTimer = () => {
    if (!timer && listDoingLength > 0) {
      setTimer(true);
    }
  };

  const handleStopTimer = () => {
    if (timer) {
      setTimer(false);
    }
  };

  const handleSave = () => {
    handleStopTimer();
    onSave(elapsedTime);
    setElapsedTime(0);
  };

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, "0")} : ${minutes
      .toString()
      .padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className={styles.timer_block}>
      <span>{formatTime(elapsedTime)}</span>
      <div className={styles.time_button_block}>
        <button onClick={handleStartTimer} disabled={listDoingLength === 0}>
          Start
        </button>

        <button onClick={handleStopTimer} disabled={listDoingLength === 0}>
          Stop
        </button>
        <button onClick={handleSave} disabled={listDoingLength === 0}>Save Result</button>
      </div>
    </div>
  );
}
