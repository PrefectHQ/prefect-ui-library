import { blockSchemaCapabilities, BlockSchemaCapability } from '@/models/BlockSchema'
import { MockFunction } from '@/services/Mocker'
import { shuffle } from '@/utilities/arrays'

export const randomBlockSchemaCapabilities: MockFunction<BlockSchemaCapability[], []> = function() {
  return shuffle(blockSchemaCapabilities.slice()).slice(0, this.create('number', [1, blockSchemaCapabilities.length]))
}