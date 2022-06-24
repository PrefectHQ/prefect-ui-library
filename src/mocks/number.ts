/* eslint-disable prefer-arrow-callback */
import { MockFunction } from '@/services'
import { uniform } from '@/utilities/math'

export const randomNumber: MockFunction<number, [number?, number?]> = function(min = 0, max = 100) {
  return uniform(min, max)
}