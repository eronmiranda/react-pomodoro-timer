import Button from '@mui/joy/Button';

function TimerToggleButton(props) {
  return (
    <Button
      variant="soft"
      color="primary" 
      size="lg"
      sx={{
        fontSize: "1rem",
      }}
      {...props} >
    </Button>
  );
}

export default TimerToggleButton;

