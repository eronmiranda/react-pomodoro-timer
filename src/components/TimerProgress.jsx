import Box from "@mui/joy/Box";
import LinearProgress from "@mui/joy/LinearProgress";

function TimerProgress(props) {
  return (
    <Box sx={{ width: "100%", mb: 3 }}>
      <LinearProgress
        determinate
        variant="soft"
        value={props.percentage}
        aria-label="Timer progress"
        sx={{
          "--LinearProgress-thickness": "4px",
          "--LinearProgress-radius": "2px",
          color: "white",
          bgcolor: "rgba(255, 255, 255, 0.2)",
          transition: "width 1s linear",
        }}
      />
    </Box>
  );
}

export default TimerProgress;
