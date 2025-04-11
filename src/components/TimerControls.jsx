import Stack from "@mui/joy/Stack";
import Box from "@mui/joy/Box";
import PomodoroButton from "./PomodoroButton";
import StopButton from "./StopButton";
import NextButton from "./NextButton";
import SettingsButton from "./SettingsButton";

export function TimerControls({
  isActive,
  onToggle,
  onStop,
  onNext,
  onSettings,
  color,
}) {
  return (
    <Box
      sx={{
        mt: { xs: 2, sm: 3 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 2, sm: 3 },
      }}
    >
      <Stack
        direction="row"
        spacing={{ xs: 2, sm: 3 }}
        sx={{
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isActive ? (
          <>
            <StopButton onClick={onStop} />
            <PomodoroButton
              onClick={onToggle}
              isActive={isActive}
              color={color}
            />
            <NextButton onClick={onNext} />
          </>
        ) : (
          <PomodoroButton
            onClick={onToggle}
            isActive={isActive}
            color={color}
          />
        )}
      </Stack>
      <SettingsButton onClick={onSettings} />
    </Box>
  );
}
