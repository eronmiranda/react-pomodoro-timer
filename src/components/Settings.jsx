import { useSettings } from '../context/SettingsContext';
import { useTimerSliders } from '../hooks/useTimerSliders';
import BackButton from './BackButton';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Box from '@mui/joy/Box';
import TimerSliders from './TimerSliders';

const timerSettings = [
  { label: 'Work', value: 'workMinutes', color: '#ba4949' },
  { label: 'Short Break', value: 'shortBreakMinutes', color: '#518a58' },
  { label: 'Long Break', value: 'longBreakMinutes', color: '#397097' }
];

function Settings() {
  const { setShowSettings, setMode } = useSettings();
  const { getTimerValue, getTimerSetter } = useTimerSliders();

  const handleValueChange = (value, newValue) => {
    const setValue = getTimerSetter(value);
    const validValue = Math.min(Math.max(Number(newValue) || 1, 1), 120);
    setValue(validValue);
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '100%',
        padding: { xs: '0 16px', sm: '0 24px', md: '0' },
        margin: '0 auto',
        boxSizing: 'border-box'
      }}
    >
      <Sheet
        variant='soft'
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          padding: { 
            xs: '20px 16px', 
            sm: '24px 20px',
            md: '30px 24px' 
          },
          borderRadius: '6px',
          width: '100%',
          maxWidth: { sm: '500px', md: '600px' },
          margin: '0 auto',
          minHeight: { xs: '350px', sm: '400px' },
          overflow: 'hidden',
          boxSizing: 'border-box'
        }}
      >
        <Stack 
          spacing={{ xs: 2.5, sm: 3, md: 4 }}
          sx={{
            width: '100%',
            maxWidth: '100%',
            margin: '0 auto'
          }}
        >
          {timerSettings.map(({ label, value, color }) => (
            <TimerSliders
              key={value}
              label={label}
              value={value}
              color={color}
              currentValue={getTimerValue(value)}
              onValueChange={(newValue) => handleValueChange(value, newValue)}
            />
          ))}
          <Stack
            direction='row'
            justifyContent='center'
            sx={{ 
              mt: { xs: 2, sm: 3 },
              width: '100%'
            }}
          >
            <BackButton
              onClick={() => {
                setShowSettings(false);
                setMode('work');
              }}
            />
          </Stack>
        </Stack>
      </Sheet>
    </Box>
  );
}

export default Settings;
