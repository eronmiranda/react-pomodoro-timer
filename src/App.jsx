import { lazy, Suspense } from "react";
import Box from "@mui/joy/Box";
import CircularProgress from "@mui/joy/CircularProgress";
import { SettingsProvider, useSettings } from "./context/SettingsContext";

const Timer = lazy(() => import("./components/Timer"));
const Settings = lazy(() => import("./components/Settings"));

const LoadingSpinner = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <CircularProgress 
      size="lg"
      variant="soft"
      sx={{ 
        '--CircularProgress-trackColor': 'rgba(255, 255, 255, 0.2)',
        '--CircularProgress-progressColor': 'white',
      }}
    />
  </Box>
);

function PomodoroApp() {
  const { showSettings, color } = useSettings();

  return (
    <main
      style={{
        backgroundColor: color,
        minHeight: "100vh",
        transition: "background-color 0.3s ease-in-out",
      }}
    >
      <Box
        sx={{
          maxWidth: "620px",
          margin: "0 auto",
          padding: "45px 12px",
        }}
      >
        <Suspense fallback={<LoadingSpinner />}>
          {showSettings ? <Settings /> : <Timer />}
        </Suspense>
      </Box>
    </main>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <PomodoroApp />
    </SettingsProvider>
  );
}
