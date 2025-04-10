import { useEffect, useCallback } from 'react';
import { useSettings } from '../context/SettingsContext';
import { useTimer } from '../hooks/useTimer';
import Sheet from '@mui/joy/Sheet';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TimerDisplay from './TimerDisplay';
import TimerProgress from './TimerProgress';
import { TimerControls } from './TimerControls';
import 'react-circular-progressbar/dist/styles.css';

function Timer() {
  const { setShowSettings } = useSettings();
  const {
    isActive,
    setIsActive,
    minutes,
    seconds,
    percentage,
    mode,
    color,
    switchMode
  } = useTimer();

  const handlePomodoroClick = useCallback(() => {
    setIsActive(prev => !prev);
  }, [setIsActive]);

  const handleSpaceKey = useCallback((event) => {
    if (event.code === 'Space') {
      event.preventDefault();
      handlePomodoroClick();
    }
  }, [handlePomodoroClick]);

  const handleStop = useCallback(() => {
    setIsActive(false);
    switchMode('work');
  }, [setIsActive, switchMode]);

  const handleNext = useCallback(() => {
    switchMode();
    setIsActive(false);
  }, [switchMode, setIsActive]);

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
        padding: { xs: '20px 0', sm: '30px 0' },
        borderRadius: '6px',
        marginBottom: '20px',
        width: '100%',
      }}
    >
      <Tabs
        value={mode}
        onChange={(_, newMode) => switchMode(newMode)}
        sx={{ bgcolor: 'transparent', mb: 2 }}
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
      
      <TimerControls
        isActive={isActive}
        onToggle={handlePomodoroClick}
        onStop={handleStop}
        onNext={handleNext}
        onSettings={() => setShowSettings(true)}
        color={color}
      />
    </Sheet>
  );
}

export default Timer;
