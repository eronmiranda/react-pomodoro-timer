import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';

function TimerTabs({ mode, onModeChange }) {
  return (
    <Tabs
      value={mode}
      onChange={(_, newMode) => onModeChange(newMode)}
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
  );
}

export default TimerTabs;
