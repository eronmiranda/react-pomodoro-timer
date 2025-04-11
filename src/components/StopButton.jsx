import IconButton from "@mui/joy/IconButton";
import StopIcon from "@mui/icons-material/Stop";

function StopButton(props) {
  return (
    <IconButton
      {...props}
      variant="plain"
      aria-label="Stop timer"
      sx={{
        fontSize: "1.2rem",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        color: "white",
        width: "45px",
        height: "45px",
        borderRadius: "10px",
        transition: "all 0.2s ease",
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.2)",
        },
        "&:active": {
          backgroundColor: "rgba(255, 255, 255, 0.15)",
        },
        ...props.sx,
      }}
    >
      <StopIcon />
    </IconButton>
  );
}

export default StopButton;
