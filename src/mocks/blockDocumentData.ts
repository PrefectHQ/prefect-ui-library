import { MockFunction } from '@/services/Mocker'

export const randomBlockDocumentData: MockFunction<Record<string, unknown>> = function() {
  const dataObject: Record<string, unknown> = {}
  const data = ['email', 'slack']
  const dataKey = data[Math.floor(Math.random()*data.length)]
  const dataValue = dataKey === 'email' ? this.create('email') : this.create('string')

  dataObject[dataKey] = dataValue

  return dataObject
}