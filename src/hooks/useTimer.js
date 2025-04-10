import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useSettings } from "../context/SettingsContext";

export function useTimer() {
  const {
    mode,
    setMode,
    workMinutes,
    shortBreakMinutes,
    longBreakMinutes,
    colors,
  } = useSettings();

  const [isActive, setIsActive] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(workMinutes * 60);
  const [sessionCount, setSessionCount] = useState(1);
  const audioRef = useRef(new Audio("/sounds/work-tone.mp3"));

  const { minutes, seconds, percentage } = useMemo(() => {
    const mins = Math.floor(secondsLeft / 60);
    const secs = (secondsLeft % 60).toString().padStart(2, "0");
    const totalSeconds =
      mode === "work"
        ? workMinutes * 60
        : mode === "shortBreak"
          ? shortBreakMinutes * 60
          : longBreakMinutes * 60;
    const perc =
      totalSeconds > 0
        ? 100 - Math.round((secondsLeft / totalSeconds) * 100)
        : 0;

    return { minutes: mins, seconds: secs, percentage: perc };
  }, [secondsLeft, mode, workMinutes, shortBreakMinutes, longBreakMinutes]);

  const switchMode = useCallback(
    (newMode = null) => {
      const nextMode =
        newMode ||
        (mode === "work"
          ? sessionCount % 4 === 0
            ? "longBreak"
            : "shortBreak"
          : "work");

      const nextSeconds =
        nextMode === "work"
          ? workMinutes * 60
          : nextMode === "shortBreak"
            ? shortBreakMinutes * 60
            : longBreakMinutes * 60;

      if (!newMode && mode === "work") {
        audioRef.current.play();
        setSessionCount((count) => count + 1);
      }

      if (newMode) {
        setIsActive(false);
      }

      setMode(nextMode);
      setSecondsLeft(nextSeconds);
    },
    [
      mode,
      sessionCount,
      setMode,
      workMinutes,
      shortBreakMinutes,
      longBreakMinutes,
    ],
  );

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSecondsLeft((current) => {
          if (current === 0) {
            switchMode();
            return current;
          }
          return current - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, switchMode]);

  return {
    isActive,
    setIsActive,
    minutes,
    seconds,
    percentage,
    mode,
    sessionCount,
    switchMode,
    color: colors[mode],
  };
}
