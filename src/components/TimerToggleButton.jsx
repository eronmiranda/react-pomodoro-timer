import Button from '@mui/joy/Button';

function TimerToggleButton({ isActive, ...props }) {
  return (
    <Button
      variant="solid"
      size="lg"
      sx={{
        fontSize: "1.5rem",
        fontWeight: "bold",
        textTransform: "uppercase",
        borderRadius: "10px",
        width: "200px",
        height: "60px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        backgroundColor: isActive ? "#FF5555" : "#4CAF50",
        color: "white",
        transition: "background-color 0.3s",
        "&:hover": {
          backgroundColor: isActive ? "#E04E4E" : "#45A049",
        },
      }}
      {...props}
    >
      {isActive ? "Pause" : "Start"}
    </Button>
  );
}

export default TimerToggleButton;
