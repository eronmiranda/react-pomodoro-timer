import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";
import SettingsButton from "./SettingsButton";
import {useContext, useState, useEffect} from "react";
import SettingsContext from "./SettingsContext";
import StopButton from './StopButton';

const red = '#f54e4e';
const green = '#4aec8c';

function Timer() {
  const settingsInfo = useContext(SettingsContext);

  const [isActive, setIsActive] = useState(true);
  const [mode, setMode] = useState('work'); // work or break
  const [secondsLeft, setSecondsLeft] = useState(settingsInfo.workMinutes * 60);

  useEffect(() => {
    let interval = null;

    if (!isActive) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev === 0) {
            // Switch modes when timer hits 0
            const nextMode = mode === 'work' ? 'break' : 'work';
            const nextSeconds = (nextMode === 'work' ? settingsInfo.workMinutes : settingsInfo.breakMinutes) * 60;
            setMode(nextMode);
            return nextSeconds;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, mode, settingsInfo]);

  useEffect(() => {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = (secondsLeft % 60).toString().padStart(2, '0');
    document.title = `${minutes}:${seconds} - ${mode === 'work' ? 'Time to work!' : 'Time to break!'}`;

    return () => {
      document.title = "Pomodoro Timer";
    };
  }, [secondsLeft, mode]);

  const totalSeconds = (mode === 'work' 
    ? settingsInfo.workMinutes 
    : settingsInfo.breakMinutes
  ) * 60;
  const percentage = Math.round(secondsLeft / totalSeconds * 100);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = (secondsLeft % 60).toString().padStart(2, '0');

  return (
    <div>
      <CircularProgressbar
        value={percentage}
        text={`${minutes}:${seconds}`}
        styles={buildStyles({
          textColor:'#fff',
          pathColor:mode === 'work' ? red : green,
          tailColor:'rgba(255,255,255,.2)',
        })}
      />
      <div style={{ marginTop: '20px' }}>
        {isActive
          ? <PlayButton onClick={() => { setIsActive(false) }} />
          : <PauseButton onClick={() => { setIsActive(true) }} />}
        <StopButton onClick={() => { 
          setIsActive(true);
          setMode('work');
          setSecondsLeft(settingsInfo.workMinutes * 60);
        }} />
      </div>
      <div style={{ marginTop:'20px' }}>
        <SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />
      </div>
    </div>
  );
}

export default Timer;
