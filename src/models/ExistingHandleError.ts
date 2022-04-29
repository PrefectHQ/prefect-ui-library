import axios, { AxiosError } from 'axios'
import { Require } from '@/types/utilities'

export type ExistingHandleError = {
  detail: string,
}

export function isExistingHandleError(error: unknown): error is Require<AxiosError<ExistingHandleError>, 'response'> {
  if (!axios.isAxiosError(error)) {
    return false
  }

  if (error.response === undefined) {
    return false
  }

  const { data } = error.response

  return typeof data === 'object' && data !== null && 'detail' in data
}