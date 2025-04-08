import SettingsContext from './SettingsContext';
import {useContext} from 'react';
import BackButton from './BackButton';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Slider from '@mui/joy/Slider';
import Input from '@mui/joy/Input';
import Box from '@mui/joy/Box';

const timerSettings = [
  {
    label: 'Work',
    value: 'workMinutes',
    setValue: 'setWorkMinutes',
    color: '#ba4949'
  },
  {
    label: 'Short Break',
    value: 'shortBreakMinutes',
    setValue: 'setShortBreakMinutes',
    color: '#518a58'
  },
  {
    label: 'Long Break',
    value: 'longBreakMinutes',
    setValue: 'setLongBreakMinutes',
    color: '#397097'
  }
];

const sliderStyles = (color) => ({
  width: '100%',
  padding: {
    xs: '8px 0',
    sm: '12px 0'
  },
  '& .MuiSlider-thumb': {
    width: {
      xs: '16px',
      sm: '20px'
    },
    height: {
      xs: '16px',
      sm: '20px'
    },
    border: '2px solid white',
    backgroundColor: color,
    '&:hover, &.Mui-focusVisible': {
      boxShadow: `0 0 0 8px ${color}33`
    }
  },
  '& .MuiSlider-track': {
    border: 'none',
    height: {
      xs: '4px',
      sm: '6px'
    }
  },
  '& .MuiSlider-rail': {
    opacity: 0.25,
    backgroundColor: '#ffffff'
  },
});

const inputStyles = {
  width: {
    xs: '60px',
    sm: '80px'
  },
  backgroundColor: 'rgba(0,0,0,0.2)',
  color: 'white',
  '--Input-gap': '0px',
  '--Input-minHeight': {
    xs: '28px',
    sm: '32px'
  },
  '& input': {
    color: 'white',
    textAlign: 'right',
    paddingRight: '2px',
    fontSize: {
      xs: '0.875rem',
      sm: '1rem'
    },
    fontWeight: 600,
    // Remove arrows for other browsers
    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
      'WebkitAppearance': 'none',
      margin: 0
    },
    // Remove arrows for Firefox
    '&[type=number]': {
      'MozAppearance': 'textfield'
    }
  }
};

function Settings() {
  const settingsInfo = useContext(SettingsContext);

  const handleValueChange = (setValue, newValue) => {
    const value = Math.min(Math.max(Number(newValue) || 1, 1), 120);
    settingsInfo[setValue](value);
  };

  return(
    <Sheet
      variant='soft'
      sx={{
        textAlign: 'left',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: {
          xs: '16px 12px', 
          sm: '20px 16px'
        },
        borderRadius: '6px',
        marginBottom: '20px',
        width: '100%',
        minHeight: {
          xs: '350px',
          sm: '400px'
        },
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      <Stack 
        spacing={{ xs: 2, sm: 3 }} 
        sx={{ 
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        {timerSettings.map(({ label, value, setValue, color }) => (
          <Stack 
            key={value} 
            spacing={{ xs: 1, sm: 1.5 }}
            sx={{ width: '100%' }}
          >
            <Typography 
              level='h4' 
              sx={{ 
                color: 'rgb(255, 255, 255)',
                letterSpacing: '0.5px',
                fontSize: {
                  xs: '1rem',
                  sm: '1.2rem'
                }
              }}
            >
              {label}
            </Typography>
            <Stack 
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 1, sm: 2 }}
              sx={{ 
                width: '100%',
                boxSizing: 'border-box'
              }}
            >
              <Input
                type='number'
                value={settingsInfo[value]}
                onChange={(e) => handleValueChange(setValue, e.target.value)}
                endDecorator=':00'
                sx={{
                  ...inputStyles,
                  '--Input-focusedHighlight': color,
                  '&:hover': { borderColor: color },
                  width: {
                    xs: '100%',
                    sm: '80px'
                  },
                  flexShrink: 0
                }}
                slotProps={{
                  input: {
                    min: 1,
                    max: 120,
                    step: 1,
                  },
                }}
              />
              <Box sx={{ 
                flex: 1,
                minWidth: 0
              }}>
                <Slider
                  value={settingsInfo[value]}
                  onChange={(_, newValue) => handleValueChange(setValue, newValue)}
                  min={1}
                  max={120}
                  sx={sliderStyles(color)}
                  size='lg'
                  marks={false}
                  valueLabelDisplay='auto'
                />
              </Box>
            </Stack>
          </Stack>
        ))}
        
        <Stack 
          direction='row' 
          justifyContent='center'
          sx={{
            mt: { xs: 2, sm: 3 }
          }}
        >
          <BackButton onClick={() => {
              settingsInfo.setShowSettings(false);
              settingsInfo.setMode('work');
            }} 
          />
        </Stack>
      </Stack>
    </Sheet>
  );
}

export default Settings;
