// import './App.css';
import {useState} from "react";
import Box from '@mui/joy/Box';
import Timer from "./components/Timer";
import Settings from "./components/Settings";
import SettingsContext from "./components/SettingsContext";

const COLORS = {
  work: '#ba4949',
  shortBreak: '#518a58',
  longBreak: '#397097'
};

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(25);
  const [shortBreakMinutes, setShortBreakMinutes] = useState(5);
  const [longBreakMinutes, setLongBreakMinutes] = useState(15);
  const [mode, setMode] = useState('work'); // work, short break, long break

  return (
    <main
      style={{
        backgroundColor: COLORS[mode],
        minHeight: '100vh',
        transition: 'background-color 0.3s ease-in-out',
      }}
    >
      <SettingsContext.Provider value={{
        showSettings,
        setShowSettings,
        workMinutes,
        setWorkMinutes,
        shortBreakMinutes,
        setShortBreakMinutes,
        longBreakMinutes,
        setLongBreakMinutes,
        mode,
        setMode
      }}>
        <Box
          sx={{
            maxWidth: '620px',
            margin: '0 auto',
            padding: '45px 12px',
          }}
        >
          {showSettings ? <Settings /> : <Timer />}
        </Box>
      </SettingsContext.Provider>
    </main>
  );
}

export default App;
