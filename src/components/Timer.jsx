import 'react-circular-progressbar/dist/styles.css';
import PomodoroButton from "./PomodoroButton";
import SettingsButton from "./SettingsButton";
import StopButton from './StopButton';
import NextButton from "./NextButton";
import {useContext, useState, useEffect, useCallback, useRef, useMemo} from "react";
import SettingsContext from "./SettingsContext";
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Box from '@mui/joy/Box';
import LinearProgress from '@mui/joy/LinearProgress';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';

const COLORS = {
  work: '#ba4949',
  shortBreak: '#518a58',
  longBreak: '#397097'
};

function Timer() {
  const settingsInfo = useContext(SettingsContext);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('work'); // work, short break, long break
  const [secondsLeft, setSecondsLeft] = useState(settingsInfo.workMinutes * 60);
  const [sessionCount, setSessionCount] = useState(1);
  const audioRef = useRef(new Audio('/sounds/work-tone.mp3'));

  // time calculations
  const { minutes, seconds, percentage } = useMemo(() => {
    const mins = Math.floor(secondsLeft / 60);
    const secs = (secondsLeft % 60).toString().padStart(2, '0');
    const totalSeconds = mode === 'work' ? settingsInfo.workMinutes * 60 
                : mode === 'shortBreak' ? settingsInfo.shortBreakMinutes * 60 
                : settingsInfo.longBreakMinutes * 60;
    const perc = totalSeconds > 0 ? 100 - Math.round((secondsLeft / totalSeconds) * 100) : 0;
    
    return { minutes: mins, seconds: secs, percentage: perc };
  }, [secondsLeft, mode, settingsInfo]);

  const switchMode = useCallback(() => {
    const nextMode = mode === 'work'
      ? sessionCount % 4 === 0 ? 'longBreak' : 'shortBreak'
      : 'work';

    const nextSeconds = nextMode === 'work' ? settingsInfo.workMinutes * 60
      : nextMode === 'shortBreak' ? settingsInfo.shortBreakMinutes * 60
      : settingsInfo.longBreakMinutes * 60;

    if (mode === 'work') {
      audioRef.current.play();
    }

    setMode(nextMode);
    setSecondsLeft(nextSeconds);
    setSessionCount(count => mode === 'work' ? count : count + 1);
  }, [mode, sessionCount, settingsInfo]);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setSecondsLeft(currentSeconds => {
          if (currentSeconds === 0) {
            switchMode();
            return currentSeconds;
          }
          return currentSeconds - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, switchMode]);

  useEffect(() => {
    document.title = `${minutes}:${seconds} - ${mode === 'work' ? 'Work' : mode === 'shortBreak' ? 'Short Break' : 'Long Break'}`;
    return () => { document.title = "Pomodoro Timer"; };
  }, [minutes, seconds, mode]);

  const handleStop = () => {
    setIsActive(!isActive);
    setMode('work');
    setSecondsLeft(settingsInfo.workMinutes * 60);
    setSessionCount(1);
  };

  const handleNext = () => {
    setIsActive(!isActive);
    switchMode();
  };
  const handleModeChange = (event, newMode) => {
    setMode(newMode);
    setSecondsLeft(
      newMode === 'work' ? settingsInfo.workMinutes * 60 :
      newMode === 'shortBreak' ? settingsInfo.shortBreakMinutes * 60 :
      settingsInfo.longBreakMinutes * 60
    );
  };

  return (
    <Sheet
      variant="soft"
      sx={{
        fontFamily: 'Arial Rounded MT Bold',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: '30px 70px',
        borderRadius: '6px',
        marginBottom: '20px',
        width: '100%'
      }}
    >
      <Tabs 
        value={mode} 
        onChange={handleModeChange}
        sx={{
          bgcolor: 'transparent',
          mb: 2,
        }}
      >
        <TabList
          disableUnderline
          sx={{
            p: 0.5,
            borderRadius: 'xl',
            justifyContent: 'center',
            '& button': {
              color: 'white',
              fontSize: '0.9rem',
              fontWeight: 500,
              py: 1,
              '&.Mui-selected': {
                bgcolor: 'rgba(255, 255, 255, 0.2)',
              }
            }
          }}
        > 
          <Tab value="work" disableIndicator>Work</Tab>
          <Tab value="shortBreak" disableIndicator>Short Break</Tab>
          <Tab value="longBreak" disableIndicator>Long Break</Tab>
        </TabList>
      </Tabs>
      <Box sx={{ width: '100%', mb: 3 }}>
        <LinearProgress
          determinate
          variant="soft"
          value={percentage}
          sx={{
            '--LinearProgress-thickness': '4px',
            '--LinearProgress-radius': '2px',
            color: COLORS[mode],
            bgcolor: 'rgba(255, 255, 255, 0.2)',
            transition: 'width 1s linear',
          }}
        />
      </Box>

      <Box 
        sx={{
          textAlign: 'center',
          color: '#fff',
          fontSize: '7rem',
          fontWeight: 'bold',
          mb: 4,
          letterSpacing: '4px'
        }}
      >
        {`${minutes}:${seconds}`}
      </Box>

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
          <PomodoroButton 
            onClick={() => setIsActive(!isActive)} 
            isActive={isActive}
            color={COLORS[mode]}
          />

          {isActive && (
            <>
              <StopButton 
                onClick={handleStop}
                sx={{
                  position: "absolute",
                  right: 20,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
              <NextButton 
                onClick={handleNext}
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
