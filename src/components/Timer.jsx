import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import TimerToggleButton from "./TimerToggleButton";
import SettingsButton from "./SettingsButton";
import StopButton from './StopButton';
import NextButton from "./NextButton";
import {useContext, useState, useEffect, useCallback} from "react";
import SettingsContext from "./SettingsContext";
import Stack from '@mui/joy/Stack';

const red = '#f54e4e';
const green = '#4aec8c';
const blue = '#4e9ef5';

function Timer() {
  const settingsInfo = useContext(SettingsContext);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('work'); // work, short break, long break
  const [secondsLeft, setSecondsLeft] = useState(settingsInfo.workMinutes * 60);
  const [sessionCount, setSessionCount] = useState(1);

  const getNextSeconds = useCallback((nextMode = mode) => {
    return (nextMode === 'work' ? settingsInfo.workMinutes 
          : nextMode === 'shortBreak' ? settingsInfo.shortBreakMinutes 
          : settingsInfo.longBreakMinutes) * 60;
  }, [mode, settingsInfo]);

  const switchMode = useCallback(() => {
    setSessionCount((prevSessionCount) => {
      let newSessionCount = prevSessionCount;
      let nextMode;

      if (mode === 'work') {
        nextMode = prevSessionCount % 4 === 0 ? 'longBreak' : 'shortBreak';
      } else {
        newSessionCount++;
        nextMode = 'work';
      }
  
      setMode(nextMode);
      setSecondsLeft(getNextSeconds(nextMode));

      return newSessionCount;
    });
  }, [mode, getNextSeconds]);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setSecondsLeft((secondsLeft) => {
          // Switch modes when timer hits 0
          if (secondsLeft === 0) { 
            switchMode();
            return getNextSeconds();
          }
          return secondsLeft - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, switchMode, getNextSeconds]);

  useEffect(() => {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = (secondsLeft % 60).toString().padStart(2, '0');
    document.title = `${minutes}:${seconds} - ${mode === 'work' ? 'Work' : mode === 'shortBreak' ? 'Short Break' : 'Long Break'}`;

    return () => { document.title = "Pomodoro Timer"; };
  }, [secondsLeft, mode]);

  const totalSeconds = getNextSeconds();
  const percentage = totalSeconds > 0 ? Math.round((secondsLeft / totalSeconds) * 100) : 0;
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = (secondsLeft % 60).toString().padStart(2, '0');
  console.log("sessionCount:", sessionCount);
  return (
    <div style={{ backgroundColor:'rgba(255, 255, 255, 0.1)', padding: '30px', borderRadius: '6px' , marginBottom: '20px' , width: '100%'}}>
      <CircularProgressbar
        value={percentage}
        text={`${minutes}:${seconds}`}
        styles={buildStyles({
          textColor:'#fff',
          pathColor:mode === 'work' ? red : mode === 'shortBreak' ? green : blue,
          tailColor:'rgba(255,255,255,.2)',
        })}
      />

      <div style={{ marginTop: '20px' }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isActive
            ? <TimerToggleButton onClick={() => { setIsActive(false) }}>PAUSE</TimerToggleButton>
            : <TimerToggleButton onClick={() => { setIsActive(true) }}>START</TimerToggleButton>}
          {isActive ? 
            <StopButton onClick={() => { 
              setIsActive(false);
              setMode('work');
              setSecondsLeft(settingsInfo.workMinutes * 60);
              setSessionCount(1);
              }} 
            /> : null }
          {isActive ? 
            <NextButton 
              onClick={() => {
                setIsActive(false);
                switchMode();
              }}
            /> : null }
        </Stack>
      </div>
      <div style={{ marginTop:'20px' }}>
        <SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />
      </div>
    </div>
  );
}

export default Timer;
