import { useColorTheme, useThemeTokens as useDesignThemeTokens } from '@prefecthq/prefect-design'
import { reactive, watch, readonly } from 'vue'

type ThemeTokens = ReturnType<typeof useDesignThemeTokens> & ReturnType<typeof getTokens>

function factory(): () => Readonly<ThemeTokens> {
  const { value: theme } = useColorTheme()
  const designTokens = useDesignThemeTokens()

  const tokens = reactive({}) as ThemeTokens

  setTokens()

  watch(theme, () => setTokens())

  function setTokens(): void {
    requestAnimationFrame(() => {
      Object.assign(tokens, designTokens, getTokens())
    })
  }

  function useThemeTokens(): Readonly<ThemeTokens> {
    return readonly(tokens)
  }

  return useThemeTokens
}

export const useThemeTokens = factory()

// this makes more sense to just infer the return type
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function getTokens() {
  const style = getComputedStyle(document.body)

  return {
    stateCompleted50: style.getPropertyValue('--state-completed-50'),
    stateCompleted100: style.getPropertyValue('--state-completed-100'),
    stateCompleted200: style.getPropertyValue('--state-completed-200'),
    stateCompleted300: style.getPropertyValue('--state-completed-300'),
    stateCompleted400: style.getPropertyValue('--state-completed-400'),
    stateCompleted500: style.getPropertyValue('--state-completed-500'),
    stateCompleted600: style.getPropertyValue('--state-completed-600'),
    stateCompleted700: style.getPropertyValue('--state-completed-700'),
    stateCompleted800: style.getPropertyValue('--state-completed-800'),
    stateCompleted900: style.getPropertyValue('--state-completed-900'),
    stateFailed50: style.getPropertyValue('--state-failed-50'),
    stateFailed100: style.getPropertyValue('--state-failed-100'),
    stateFailed200: style.getPropertyValue('--state-failed-200'),
    stateFailed300: style.getPropertyValue('--state-failed-300'),
    stateFailed400: style.getPropertyValue('--state-failed-400'),
    stateFailed500: style.getPropertyValue('--state-failed-500'),
    stateFailed600: style.getPropertyValue('--state-failed-600'),
    stateFailed700: style.getPropertyValue('--state-failed-700'),
    stateFailed800: style.getPropertyValue('--state-failed-800'),
    stateFailed900: style.getPropertyValue('--state-failed-900'),
    stateRunning50: style.getPropertyValue('--state-running-50'),
    stateRunning100: style.getPropertyValue('--state-running-100'),
    stateRunning200: style.getPropertyValue('--state-running-200'),
    stateRunning300: style.getPropertyValue('--state-running-300'),
    stateRunning400: style.getPropertyValue('--state-running-400'),
    stateRunning500: style.getPropertyValue('--state-running-500'),
    stateRunning600: style.getPropertyValue('--state-running-600'),
    stateRunning700: style.getPropertyValue('--state-running-700'),
    stateRunning800: style.getPropertyValue('--state-running-800'),
    stateRunning900: style.getPropertyValue('--state-running-900'),
    statePending50: style.getPropertyValue('--state-pending-50'),
    statePending100: style.getPropertyValue('--state-pending-100'),
    statePending200: style.getPropertyValue('--state-pending-200'),
    statePending300: style.getPropertyValue('--state-pending-300'),
    statePending400: style.getPropertyValue('--state-pending-400'),
    statePending500: style.getPropertyValue('--state-pending-500'),
    statePending600: style.getPropertyValue('--state-pending-600'),
    statePending700: style.getPropertyValue('--state-pending-700'),
    statePending800: style.getPropertyValue('--state-pending-800'),
    statePending900: style.getPropertyValue('--state-pending-900'),
    statePaused50: style.getPropertyValue('--state-paused-50'),
    statePaused100: style.getPropertyValue('--state-paused-100'),
    statePaused200: style.getPropertyValue('--state-paused-200'),
    statePaused300: style.getPropertyValue('--state-paused-300'),
    statePaused400: style.getPropertyValue('--state-paused-400'),
    statePaused500: style.getPropertyValue('--state-paused-500'),
    statePaused600: style.getPropertyValue('--state-paused-600'),
    statePaused700: style.getPropertyValue('--state-paused-700'),
    statePaused800: style.getPropertyValue('--state-paused-800'),
    statePaused900: style.getPropertyValue('--state-paused-900'),
    stateScheduled50: style.getPropertyValue('--state-scheduled-50'),
    stateScheduled100: style.getPropertyValue('--state-scheduled-100'),
    stateScheduled200: style.getPropertyValue('--state-scheduled-200'),
    stateScheduled300: style.getPropertyValue('--state-scheduled-300'),
    stateScheduled400: style.getPropertyValue('--state-scheduled-400'),
    stateScheduled500: style.getPropertyValue('--state-scheduled-500'),
    stateScheduled600: style.getPropertyValue('--state-scheduled-600'),
    stateScheduled700: style.getPropertyValue('--state-scheduled-700'),
    stateScheduled800: style.getPropertyValue('--state-scheduled-800'),
    stateScheduled900: style.getPropertyValue('--state-scheduled-900'),
    stateCancelled50: style.getPropertyValue('--state-cancelled-50'),
    stateCancelled100: style.getPropertyValue('--state-cancelled-100'),
    stateCancelled200: style.getPropertyValue('--state-cancelled-200'),
    stateCancelled300: style.getPropertyValue('--state-cancelled-300'),
    stateCancelled400: style.getPropertyValue('--state-cancelled-400'),
    stateCancelled500: style.getPropertyValue('--state-cancelled-500'),
    stateCancelled600: style.getPropertyValue('--state-cancelled-600'),
    stateCancelled700: style.getPropertyValue('--state-cancelled-700'),
    stateCancelled800: style.getPropertyValue('--state-cancelled-800'),
    stateCancelled900: style.getPropertyValue('--state-cancelled-900'),
    stateCrashed50: style.getPropertyValue('--state-crashed-50'),
    stateCrashed100: style.getPropertyValue('--state-crashed-100'),
    stateCrashed200: style.getPropertyValue('--state-crashed-200'),
    stateCrashed300: style.getPropertyValue('--state-crashed-300'),
    stateCrashed400: style.getPropertyValue('--state-crashed-400'),
    stateCrashed500: style.getPropertyValue('--state-crashed-500'),
    stateCrashed600: style.getPropertyValue('--state-crashed-600'),
    stateCrashed700: style.getPropertyValue('--state-crashed-700'),
    stateCrashed800: style.getPropertyValue('--state-crashed-800'),
    stateCrashed900: style.getPropertyValue('--state-crashed-900'),
  }
}