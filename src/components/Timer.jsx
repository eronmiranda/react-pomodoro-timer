import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import TimerToggleButton from "./TimerToggleButton";
import SettingsButton from "./SettingsButton";
import StopButton from './StopButton';
import NextButton from "./NextButton";
import {useContext, useState, useEffect, useCallback} from "react";
import SettingsContext from "./SettingsContext";
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Box from '@mui/joy/Box';

const red = '#FF5555';
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
    <Sheet
      variant="soft"
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: '30px 70px',
        borderRadius: '6px',
        marginBottom: '20px',
        width: '100%'
      }}
    >
      <CircularProgressbar
        value={percentage}
        text={`${minutes}:${seconds}`}
        styles={buildStyles({
          textColor:'#fff',
          pathColor:mode === 'work' ? red : mode === 'shortBreak' ? green : blue,
          tailColor:'rgba(255,255,255,.2)',
        })}
      />

      <Box sx={{ mt: 2 }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <TimerToggleButton onClick={() => setIsActive(!isActive)} isActive={isActive} />

          {isActive && (
            <>
              <StopButton 
                onClick={() => { 
                  setIsActive(false);
                  setMode('work');
                  setSecondsLeft(settingsInfo.workMinutes * 60);
                  setSessionCount(1);
                }}
                sx={{
                  position: "absolute",
                  right: 20,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
              <NextButton 
                onClick={() => {
                  setIsActive(!isActive);
                  switchMode();
                }}
                sx={{
                  position: "absolute",
                  right: -30,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
            </>
          )}
        </Stack>
      </Box>
      <Box sx={{ mt: 2 }}>
        <SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />
      </Box>
    </Sheet>
  );
}

export default Timer;

