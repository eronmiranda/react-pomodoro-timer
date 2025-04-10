import { createContext, useContext, useState, useEffect } from "react";

const COLORS = {
  work: "#ba4949",
  shortBreak: "#518a58",
  longBreak: "#397097",
};

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [workMinutes, setWorkMinutes] = useState(() => 
    parseInt(localStorage.getItem('workMinutes')) || 25
  );
  const [shortBreakMinutes, setShortBreakMinutes] = useState(() => 
    parseInt(localStorage.getItem('shortBreakMinutes')) || 5
  );
  const [longBreakMinutes, setLongBreakMinutes] = useState(() => 
    parseInt(localStorage.getItem('longBreakMinutes')) || 15
  );
  const [mode, setMode] = useState('work');
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    localStorage.setItem('workMinutes', workMinutes);
    localStorage.setItem('shortBreakMinutes', shortBreakMinutes);
    localStorage.setItem('longBreakMinutes', longBreakMinutes);
  }, [workMinutes, shortBreakMinutes, longBreakMinutes, mode]);

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

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
