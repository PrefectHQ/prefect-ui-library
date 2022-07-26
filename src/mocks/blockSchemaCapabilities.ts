import { MockFunction } from '@/services/Mocker'

export const randomBlockSchemaCapabilities: MockFunction<string[], []> = function() {
  return this.createMany('noun', this.create('number', [5, 10]))
}