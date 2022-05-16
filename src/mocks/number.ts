import { uniform } from './math'
import { MockFunction } from '@/services/Mocker'

export const randomNumber: MockFunction<number> = function(min: number = 0, max: number = 100) {
  return uniform(min, max)
}