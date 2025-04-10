import Box from '@mui/joy/Box';
import Timer from './components/Timer';
import Settings from './components/Settings';
import { SettingsProvider, useSettings } from './context/SettingsContext';

function PomodoroApp() {
  const { showSettings, mode, colors } = useSettings();

  return (
    <main
      style={{
        backgroundColor: colors[mode],
        minHeight: '100vh',
        transition: 'background-color 0.3s ease-in-out',
      }}
    >
      <Box
        sx={{
          maxWidth: '620px',
          margin: '0 auto',
          padding: '45px 12px',
        }}
      >
        {showSettings ? <Settings /> : <Timer />}
      </Box>
    </main>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <PomodoroApp />
    </SettingsProvider>
  );
}
