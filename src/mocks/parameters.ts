import { MockFunction } from '@/services/Mocker'

export const randomParameters: MockFunction<Record<string, unknown>, []> = function() {
  const keys = this.createMany('string', this.create('number', [0, 25]))
  const parameters: Record<string, unknown> = {}

  keys.forEach(key => parameters[key] = this.create('any'))

  return parameters
}