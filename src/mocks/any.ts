/* eslint-disable @typescript-eslint/no-explicit-any */
import { randomBoolean } from './boolean'
import { randomDate } from './date'
import { randomNumber } from './number'
import { randomString } from './string'
import { MockFunction } from '@/services/Mocker'
import { choice } from '@/utilities/arrays'

const mocks = [randomString, randomNumber, randomBoolean, randomDate]

export const randomAny: MockFunction<any> = function() {
  return choice(Object.values(mocks)).bind(this)()
}