import { useSettings } from '../context/SettingsContext';

export function useTimerSliders() {
  const {
    workMinutes,
    setWorkMinutes,
    shortBreakMinutes,
    setShortBreakMinutes,
    longBreakMinutes,
    setLongBreakMinutes
  } = useSettings();

  const getTimerValue = (key) => ({
    workMinutes: workMinutes,
    shortBreakMinutes: shortBreakMinutes,
    longBreakMinutes: longBreakMinutes
  })[key];

  const getTimerSetter = (key) => ({
    workMinutes: setWorkMinutes,
    shortBreakMinutes: setShortBreakMinutes,
    longBreakMinutes: setLongBreakMinutes
  })[key];

  return { getTimerValue, getTimerSetter };
}
