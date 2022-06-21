/* eslint-disable prefer-arrow-callback */
import { MockFunction } from '@/services'
import { uniform } from '@/utilities/math'

export const randomNumber: MockFunction<number, [number?, number?]> = function(min: number = 0, max: number = 100) {
  return uniform(min, max)
}