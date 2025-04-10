import { createContext, useContext, useState } from 'react';

const COLORS = {
  work: '#ba4949',
  shortBreak: '#518a58',
  longBreak: '#397097',
};

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(25);
  const [shortBreakMinutes, setShortBreakMinutes] = useState(5);
  const [longBreakMinutes, setLongBreakMinutes] = useState(15);
  const [mode, setMode] = useState('work'); // work, short break, long break

  const value = {
    showSettings,
    setShowSettings,
    workMinutes,
    setWorkMinutes,
    shortBreakMinutes,
    setShortBreakMinutes,
    longBreakMinutes,
    setLongBreakMinutes,
    mode,
    setMode,
    colors: COLORS,
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
