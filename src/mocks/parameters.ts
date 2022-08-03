import { Parameters } from '@/models'
import { MockFunction } from '@/services/Mocker'

export const randomParameters: MockFunction<Parameters, []> = function() {
  const keys = this.createMany('string', this.create('number', [0, 25]))
  const parameters: Parameters = {}

  keys.forEach(key => parameters[key] = this.create('any'))

  return parameters
}