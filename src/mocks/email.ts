import { MockFunction } from '@/services/Mocker'

export const randomEmail: MockFunction<string, []> = function() {
  return `${this.create('noun')}@email.com`
}