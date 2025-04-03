import Button from '@mui/joy/Button';

function PomodoroButton({ isActive, ...props }) {
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
        boxShadow: isActive ? "inset 0px 3px 4px rgba(0, 0, 0, 0.2)" : "0px 6px 0px #D18480",
        transform: isActive ? "translateY(6px)" : "translateY(0px)",
        backgroundColor: "white",
        color: "#A3524E",
        border: "none",
        transition: "all 0.2s",
        "&:hover": {
          backgroundColor: "#F8F8F8",
        },
        "&:active": {
          boxShadow: isActive ? "inset 0px 3px 4px rgba(0, 0, 0, 0.2)" : "0px 3px 0px #D18480",
          transform: "translateY(3px)",
        },
      }}
      {...props}
    >
      {isActive ? "Pause" : "Start"}
    </Button>
  );
}

export default PomodoroButton;
