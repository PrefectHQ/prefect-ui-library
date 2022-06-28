import { MockFunction } from '@/services/Mocker'

export const randomBlockDocumentData: MockFunction<Record<string, unknown>, []> = function() {
  const dataObject: Record<string, unknown> = {}
  const data = ['Email Addresses', 'Slack Webhook']
  const dataKey = data[Math.floor(Math.random()*data.length)]
  const dataValue = dataKey === 'Email Addresses' ?
    this.createMany('email', this.create('number', [1, 3])) :
    this.createMany('noun', this.create('number', [1, 3]))

  dataObject[dataKey] = dataValue

  return dataObject
}