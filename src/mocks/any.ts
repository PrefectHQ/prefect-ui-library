/* eslint-disable @typescript-eslint/no-explicit-any */
import { randomBoolean } from '@/mocks/boolean'
import { randomDate } from '@/mocks/date'
import { randomNumber } from '@/mocks/number'
import { randomString } from '@/mocks/string'
import { MockFunction } from '@/services/Mocker'
import { choice } from '@/utilities/arrays'

const mocks = [randomString, randomNumber, randomBoolean, randomDate]

export const randomAny: MockFunction<any, []> = function() {
  return choice(Object.values(mocks)).bind(this)()
}