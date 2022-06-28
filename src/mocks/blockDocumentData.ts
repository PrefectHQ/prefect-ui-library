import { MockFunction } from '@/services/Mocker'
import { choice } from '@/utilities'

const blockDataType = ['Email Addresses', 'Slack Webhook'] as const
type BlockDataType = typeof blockDataType[number]

export const randomBlockDocumentData: MockFunction<Record<string, unknown>, [BlockDataType?]> = function(type) {
  const dataObject: Record<string, unknown> = {}
  const dataType = type ?? choice(blockDataType as unknown as BlockDataType[])

  switch (dataType) {
    case 'Email Addresses':
      dataObject[dataType] = this.createMany('email', this.create('number', [1, 3]))
      break
    case 'Slack Webhook':
      dataObject[dataType] = this.createMany('noun', this.create('number', [1, 3]))
      break
  }

  return dataObject
}