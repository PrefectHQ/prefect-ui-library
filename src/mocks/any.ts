/* eslint-disable @typescript-eslint/no-explicit-any */
import { randomBoolean } from './boolean'
import { randomDate } from './date'
import { randomNumber } from './number'
import { randomString } from './string'
import { MockFunction } from '@/services/Mocker'
import { choice } from '@/utilities/arrays'

const mocks = [randomString, randomNumber, randomBoolean, randomDate]

export const randomAny: MockFunction<any> = function() {
  const keys = this.createMany('string', this.create('number', [0, 25]))
  const parameters: Record<string, any> = {}
  keys.forEach(key => {
    const mock = choice(Object.values(mocks)).bind(this)

    parameters[key] = mock()
  })

  return parameters
}