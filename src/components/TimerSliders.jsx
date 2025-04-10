import Input from "@mui/joy/Input";
import Slider from "@mui/joy/Slider";
import Stack from "@mui/joy/Stack";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";

function TimerSliders({ label, color, currentValue, onValueChange }) {
  return (
    <Stack spacing={{ xs: 1, sm: 1.5 }} sx={{ width: "100%" }}>
      <Typography
        level="h4"
        sx={{
          color: "white",
          letterSpacing: "0.5px",
          fontSize: { xs: "1rem", sm: "1.2rem" },
        }}
      >
        {label}
      </Typography>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2 }}
        sx={{ width: "100%" }}
      >
        <Input
          type="number"
          value={currentValue}
          onChange={(e) => onValueChange(e.target.value)}
          endDecorator=":00"
          sx={{
            width: { xs: "100%", sm: "80px" },
            backgroundColor: "rgba(0,0,0,0.2)",
            "--Input-focusedHighlight": color,
            "&:hover": { borderColor: color },
            flexShrink: 0,
            "--Input-decoratorColor": "white",
            "--Input-gap": "0px",
            "& input": {
              color: "white",
              textAlign: "right",
              // Remove arrows for other browsers
              "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
                WebkitAppearance: "none",
                margin: 0,
              },
              // Remove arrows for Firefox
              "&[type=number]": {
                MozAppearance: "textfield",
              },
            },
          }}
          slotProps={{
            input: {
              min: 1,
              max: 120,
              step: 1,
            },
          }}
        />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Slider
            value={currentValue}
            onChange={(_, newValue) => onValueChange(newValue)}
            min={1}
            max={120}
            sx={{
              width: "100%",
              "& .MuiSlider-thumb": {
                backgroundColor: color,
                border: "2px solid white",
              },
              "& .MuiSlider-track": {
                backgroundColor: color,
                border: "none",
              },
            }}
            size="lg"
            marks={false}
            valueLabelDisplay="auto"
          />
        </Box>
      </Stack>
    </Stack>
  );
}

export default TimerSliders;
