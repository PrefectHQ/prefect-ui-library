import { MockFunction } from '@/services/Mocker'

export const randomBlockSchemaCapability: MockFunction<string, []> = function() {
  return this.create('noun')
}