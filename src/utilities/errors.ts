import { isAxiosError } from 'axios'
import { isRecord, isString } from '@/utilities'

export function getApiErrorMessage(error: unknown, defaultErrorMessage: string): string {
  if (!isAxiosError(error)) {
    return defaultErrorMessage
  }

  const data = error.response?.data

  if (isRecord(data) && isString(data.detail)) {
    return data.detail
  }

  return defaultErrorMessage
}