import Box from "@mui/joy/Box";

function TimerDisplay(props) {
  return (
    <Box
      sx={{
        textAlign: "center",
        color: "#fff",
        fontSize: { xs: "4rem", sm: "5.5rem", md: "7rem" },
        fontWeight: "bold",
        letterSpacing: { xs: "2px", sm: "4px" },
      }}
    >
      {`${props.minutes}:${props.seconds}`}
    </Box>
  );
}

export default TimerDisplay;
