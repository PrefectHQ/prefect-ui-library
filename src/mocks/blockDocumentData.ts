import { MockFunction } from '@/services/Mocker'
import { choice } from '@/utilities'

const blockDataType = ['email_addresses', 'url'] as const
export type BlockDataType = typeof blockDataType[number]

export const randomBlockDocumentData: MockFunction<Record<string, unknown>, [BlockDataType?]> = function(type) {
  const dataObject: Record<string, unknown> = {}
  const dataType = type ?? choice(blockDataType as unknown as BlockDataType[])

  switch (dataType) {
    case 'email_addresses':
      dataObject[dataType] = this.createMany('email', this.create('number', [1, 3]))
      break
    case 'url':
      dataObject[dataType] = `https://hooks.slack.com/${ this.create('noun')}`
      break
    default:
      console.warn(`randomBlockDocumentData missing case for ${dataType}`)
      dataObject[dataType] = []
  }

  return dataObject
}