import { MockFunction } from '@/services/Mocker'
import { uniform } from '@/utilities/math'

export const randomNumber: MockFunction<number> = function(min: number = 0, max: number = 100) {
  return uniform(min, max)
}