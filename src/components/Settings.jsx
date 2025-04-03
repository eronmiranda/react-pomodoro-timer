import SettingsContext from "./SettingsContext";
import {useContext} from "react";
import BackButton from "./BackButton";
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Slider from '@mui/joy/Slider';
import Input from '@mui/joy/Input';

const timerSettings = [
  {
    label: 'Work',
    value: 'workMinutes',
    setValue: 'setWorkMinutes',
    color: 'rgb(245, 78, 78)'
  },
  {
    label: 'Short Break',
    value: 'shortBreakMinutes',
    setValue: 'setShortBreakMinutes',
    color: 'rgb(74, 236, 140)'
  },
  {
    label: 'Long Break',
    value: 'longBreakMinutes',
    setValue: 'setLongBreakMinutes',
    color: 'rgb(78, 158, 245)'
  }
];

const sliderStyles = (color) => ({
  width: '100%',
  padding: '10px 0',
  '& .MuiSlider-thumb': {
    border: '2px solid white',
    backgroundColor: color,
  },
  '& .MuiSlider-track': {
    backgroundColor: color,
    border: 'none',
  },
});

const inputStyles = {
  width: '80px',
  backgroundColor: 'rgba(0,0,0,0.2)',
  color: 'white',
  '--Input-gap': '0px',
  '--Input-minHeight': '32px',
  '& input': {
    color: 'white',
    textAlign: 'right',
    paddingRight: '2px',
    fontSize: '1rem',
    fontWeight: 600,
    // Remove arrows for other browsers
    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
    },
    // Remove arrows for Firefox
    '&[type=number]': {
      '-moz-appearance': 'textfield'
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
      variant="soft"
      sx={{
        textAlign: 'left',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: '30px 70px',
        borderRadius: '6px',
        marginBottom: '20px',
        width: '100%'
      }}
    >
      <Stack spacing={4}>
        {timerSettings.map(({ label, value, setValue, color }) => (
          <Stack key={value} spacing={2}>
            <Typography 
              level="h4" 
              sx={{ 
                color: 'rgb(255, 255, 255)',
                letterSpacing: '0.5px',
              }}
            >
              {label}
            </Typography>
            <Stack 
              direction="row" 
              spacing={2}
            >
              <Input
                type="number"
                value={settingsInfo[value]}
                onChange={(e) => handleValueChange(setValue, e.target.value)}
                endDecorator=":00"
                sx={{
                  ...inputStyles,
                  '--Input-focusedHighlight': color,
                  '&:hover': { borderColor: color },
                }}
                slotProps={{
                  input: {
                    min: 1,
                    max: 120,
                    step: 1,
                  },
                }}
              />
              <Slider
                value={settingsInfo[value]}
                onChange={(_, newValue) => handleValueChange(setValue, newValue)}
                min={1}
                max={120}
                sx={{
                  ...sliderStyles(color),
                  flex: 1
                }}
                size="lg"
              />

            </Stack>
          </Stack>
        ))}
        
        <Stack 
          direction="row" 
          justifyContent="center"
        >
          <BackButton onClick={() => settingsInfo.setShowSettings(!settingsInfo.setShowSettings)} />
        </Stack>
      </Stack>
    </Sheet>
  );
}

export default Settings;
