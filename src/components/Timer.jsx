import 'react-circular-progressbar/dist/styles.css';
import PomodoroButton from './PomodoroButton';
import SettingsButton from './SettingsButton';
import StopButton from './StopButton';
import NextButton from './NextButton';
import {useContext, useState, useEffect, useCallback, useRef, useMemo} from 'react';
import SettingsContext from './SettingsContext';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Box from '@mui/joy/Box';
import LinearProgress from '@mui/joy/LinearProgress';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TimerDisplay from './TimerDisplay';

const COLORS = {
  work: '#ba4949',
  shortBreak: '#518a58',
  longBreak: '#397097'
};

function Timer() {
  const settingsInfo = useContext(SettingsContext);
  const [isActive, setIsActive] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(settingsInfo.workMinutes * 60);
  const [sessionCount, setSessionCount] = useState(1);
  const audioRef = useRef(new Audio('/sounds/work-tone.mp3'));

  // time calculations
  const { minutes, seconds, percentage } = useMemo(() => {
    const mins = Math.floor(secondsLeft / 60);
    const secs = (secondsLeft % 60).toString().padStart(2, '0');
    const totalSeconds = settingsInfo.mode === 'work' ? settingsInfo.workMinutes * 60 
                        : settingsInfo.mode === 'shortBreak' ? settingsInfo.shortBreakMinutes * 60 
                        : settingsInfo.longBreakMinutes * 60;
    const perc = totalSeconds > 0 ? 100 - Math.round((secondsLeft / totalSeconds) * 100) : 0;
    
    return { minutes: mins, seconds: secs, percentage: perc };
  }, [secondsLeft, settingsInfo]);

  const switchMode = useCallback(() => {
    const nextMode = settingsInfo.mode === 'work'
                    ? sessionCount % 4 === 0 
                    ? 'longBreak' : 'shortBreak'
                    : 'work';

    const nextSeconds = nextMode === 'work' ? settingsInfo.workMinutes * 60
                                            : nextMode === 'shortBreak' ? settingsInfo.shortBreakMinutes * 60
                                            : settingsInfo.longBreakMinutes * 60;

    if (settingsInfo.mode === 'work') {
      audioRef.current.play();
    }

    settingsInfo.setMode(nextMode);
    setSecondsLeft(nextSeconds);
    setSessionCount(count => settingsInfo.mode === 'work' ? count : count + 1);
  }, [sessionCount, settingsInfo]);

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
    document.title = `${minutes}:${seconds} - ${settingsInfo.mode === 'work' ? 'Work' : settingsInfo.mode === 'shortBreak' ? 'Short Break' : 'Long Break'}`;
    return () => { document.title = 'Pomodoro Timer'; };
  }, [minutes, seconds, settingsInfo.mode]);

  const handleStop = () => {
    setIsActive(false);
    settingsInfo.setMode('work');
    setSecondsLeft(settingsInfo.workMinutes * 60);
    setSessionCount(1);
  };

  const handleNext = () => {
    setIsActive(!isActive);
    switchMode();
  };

  const handleModeChange = (event, newMode) => {
    settingsInfo.setMode(newMode);
    setSecondsLeft(
      newMode === 'work' ? settingsInfo.workMinutes * 60 
      : newMode === 'shortBreak' ? settingsInfo.shortBreakMinutes * 60 
      : settingsInfo.longBreakMinutes * 60
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
          sm: '30px 0' 
        },
        borderRadius: '6px',
        marginBottom: '20px',
        width: '100%'
      }}
    >
      <Tabs 
        value={settingsInfo.mode} 
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
                sm: '1.1rem'
              },
              fontWeight: 500,
              py: 1,
              px: {
                xs: 1,
                sm: 2
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
      <Box sx={{ width: '100%', mb: 3 }}>
        <LinearProgress
          determinate
          variant='soft'
          value={percentage}
          sx={{
            '--LinearProgress-thickness': '4px',
            '--LinearProgress-radius': '2px',
            color: 'white',
            bgcolor: 'rgba(255, 255, 255, 0.2)',
            transition: 'width 1s linear',
          }}
        />
      </Box>

      <TimerDisplay minutes={minutes} seconds={seconds}/>

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
                color={COLORS[settingsInfo.mode]}
                aria-label={`${isActive ? 'Pause' : 'Start'} timer (Space)`}
              />
              <NextButton onClick={handleNext} />
            </>
          ) : (
            <PomodoroButton 
              onClick={() => setIsActive(!isActive)} 
              isActive={isActive}
              color={COLORS[settingsInfo.mode]}
              aria-label={`${isActive ? 'Pause' : 'Start'} timer (Space)`}
            />
          )}
        </Stack>
        <SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />
      </Box>
    </Sheet>
  );
}

export default Timer;
