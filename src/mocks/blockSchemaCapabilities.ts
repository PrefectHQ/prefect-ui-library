import { blockSchemaCapability, BlockSchemaCapability } from '@/models/BlockSchema'
import { MockFunction } from '@/services/Mocker'
import { shuffle } from '@/utilities/arrays'

export const randomBlockSchemaCapabilities: MockFunction<BlockSchemaCapability[]> = function() {
  return shuffle(blockSchemaCapability.slice()).slice(0, this.create('number', [1, blockSchemaCapability.length]))
}