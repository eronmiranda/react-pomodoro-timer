import 'react-circular-progressbar/dist/styles.css';
import PomodoroButton from './PomodoroButton';
import SettingsButton from './SettingsButton';
import StopButton from './StopButton';
import NextButton from './NextButton';
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useSettings } from '../context/SettingsContext';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Box from '@mui/joy/Box';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TimerDisplay from './TimerDisplay';
import TimerProgress from './TimerProgress';

function Timer() {
  const {
    mode,
    setMode,
    workMinutes,
    shortBreakMinutes,
    longBreakMinutes,
    setShowSettings,
    colors,
  } = useSettings();

  const [isActive, setIsActive] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(workMinutes * 60);
  const [sessionCount, setSessionCount] = useState(1);
  const audioRef = useRef(new Audio('/sounds/work-tone.mp3'));

  // time calculations
  const { minutes, seconds, percentage } = useMemo(() => {
    const mins = Math.floor(secondsLeft / 60);
    const secs = (secondsLeft % 60).toString().padStart(2, '0');
    const totalSeconds = mode === 'work' 
                        ? workMinutes * 60 
                        : mode === 'shortBreak' 
                          ? shortBreakMinutes * 60 
                          : longBreakMinutes * 60;
    const perc = totalSeconds > 0 ? 100 - Math.round((secondsLeft / totalSeconds) * 100) : 0;

    return { minutes: mins, seconds: secs, percentage: perc };
  }, [secondsLeft, mode, workMinutes, shortBreakMinutes, longBreakMinutes]);

  const switchMode = useCallback(() => {
    const nextMode = mode === 'work'
                    ? sessionCount % 4 === 0
                      ? 'longBreak'
                      : 'shortBreak'
                    : 'work';

    const nextSeconds = nextMode === 'work' 
                        ? workMinutes * 60
                        : nextMode === 'shortBreak'
                          ? shortBreakMinutes * 60
                          : longBreakMinutes * 60;

    if (mode === 'work') {
      audioRef.current.play();
    }

    setTimeout(() => {
      setMode(nextMode);
      setSecondsLeft(nextSeconds);
      setSessionCount((count) => (mode === 'work' ? count : count + 1));
    }, 0);
  }, [mode, sessionCount, setMode, workMinutes, shortBreakMinutes, longBreakMinutes]);

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
    document.title = `${minutes}:${seconds} - ${mode === 'work' 
                                                ? 'Work' 
                                                : mode === 'shortBreak' 
                                                  ? 'Short Break' 
                                                  : 'Long Break'
                                                }`;
    return () => { document.title = 'Pomodoro Timer'; };
  }, [minutes, seconds, mode]);

  const handleStop = () => {
    setIsActive(false);
    setMode('work');
    setSecondsLeft(workMinutes * 60);
    setSessionCount(1);
  };

  const handleNext = () => {
    setIsActive(!isActive);
    switchMode();
  };

  const handleModeChange = (event, newMode) => {
    setMode(newMode);
    setSecondsLeft(
      newMode === 'work'
        ? workMinutes * 60
        : newMode === 'shortBreak'
          ? shortBreakMinutes * 60
          : longBreakMinutes * 60
    );
    setIsActive(false);
  };

  const handleSpaceKey = useCallback((event) => {
    if (event.code === 'Space') {
      event.preventDefault();
      setIsActive(!isActive);
    }
  }, [isActive]);

  useEffect(() => {
    document.addEventListener('keydown', handleSpaceKey);
    return () => document.removeEventListener('keydown', handleSpaceKey);
  }, [handleSpaceKey]);

  return (
    <Sheet
      variant='soft'
      sx={{
        fontFamily: 'Arial Rounded MT Bold',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: {
          xs: '20px 0',
          sm: '30px 0',
        },
        borderRadius: '6px',
        marginBottom: '20px',
        width: '100%',
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
              fontSize: {
                xs: '0.9rem',
                sm: '1.1rem',
              },
              fontWeight: 500,
              py: 1,
              px: {
                xs: 1,
                sm: 2,
              },
              '&.Mui-selected': {
                bgcolor: 'rgba(0, 0, 0, 0.2)',
              }
            }
          }}
        >
          <Tab value='work' disableIndicator>Work</Tab>
          <Tab value='shortBreak' disableIndicator>Short Break</Tab>
          <Tab value='longBreak' disableIndicator>Long Break</Tab>
        </TabList>
      </Tabs>

      <TimerProgress percentage={percentage} />

      <TimerDisplay minutes={minutes} seconds={seconds} />

      <Box
        sx={{
          mt: { xs: 2, sm: 3 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 2, sm: 3 },
        }}
      >
        <Stack
          direction='row'
          spacing={{ xs: 2, sm: 3 }}
          sx={{
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isActive ? (
            <>
              <StopButton onClick={handleStop} />
              <PomodoroButton
                onClick={() => setIsActive(!isActive)}
                isActive={isActive}
                color={colors[mode]}
                aria-label={`${isActive ? 'Pause' : 'Start'} timer (Space)`}
              />
              <NextButton onClick={handleNext} />
            </>
          ) : (
            <PomodoroButton
              onClick={() => setIsActive(!isActive)}
              isActive={isActive}
              color={colors[mode]}
              aria-label={`${isActive ? 'Pause' : 'Start'} timer (Space)`}
            />
          )}
        </Stack>
        <SettingsButton onClick={() => setShowSettings(true)} />
      </Box>
    </Sheet>
  );
}

export default Timer;
