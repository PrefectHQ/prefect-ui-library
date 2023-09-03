export function getErrorMessage(error: unknown, defaultErrorMessage: string): string {
  let errorJson

  if (typeof error === 'string') {
    try {
      errorJson = JSON.parse(error)
    } catch (parseError) {
      // Error is not a valid JSON string
      return defaultErrorMessage
    }
  } else if (typeof error === 'object' && error !== null) {
    errorJson = error
  } else {
    return defaultErrorMessage
  }

  const detail = JSON.parse(errorJson?.request?.response ?? '')?.detail
  return detail || defaultErrorMessage
}
