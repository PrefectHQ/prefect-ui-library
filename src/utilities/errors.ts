import { isDefined } from '@prefecthq/prefect-design'
import { AxiosError, isAxiosError } from 'axios'
import { Require } from '@/types/utilities'
import { isRecord, isString } from '@/utilities'

type ApiErrorResponse = {
  detail: string,
}

function isApiErrorResponse(error: unknown): error is Require<AxiosError<ApiErrorResponse>, 'response'> {
  if (!isAxiosError(error)) {
    return false
  }

  if (!isDefined(error.response)) {
    return false
  }

  const { data } = error.response

  return isRecord(data) && isString(data.detail)
}

type ApiValidationError = {
  loc: string[],
  msg: string,
  type: string,
}

type ApiValidationErrorResponse = {
  exception_detail: ApiValidationError[],
  exception_message: 'Invalid request received.',
  request_body: unknown,
}

function isApiValidationErrorResponse(error: unknown): error is Require<AxiosError<ApiValidationErrorResponse>, 'response'> {
  if (!isAxiosError(error)) {
    return false
  }

  if (!isDefined(error.response)) {
    return false
  }

  const { data } = error.response

  return isRecord(data) && data.exception_message === 'Invalid request received.'
}

function getFirstApiValidationError(error: Require<AxiosError<ApiValidationErrorResponse>, 'response'>): string {
  return error.response.data.exception_detail[0].msg
}

export function getApiErrorMessage(error: unknown, defaultErrorMessage: string): string {
  if (isApiErrorResponse(error)) {
    return error.response.data.detail
  }

  if (isApiValidationErrorResponse(error)) {
    return getFirstApiValidationError(error)
  }

  return defaultErrorMessage
}