import { useSeeds } from './useSeeds'
import { mocker } from '@/services'

export function useBlockSchemaCapabilityMock(): string {
  const capability = mocker.create('blockSchemaCapability')

  useSeeds({
    blockSchemaCapabilities: [capability],
  })

  return capability
}

export function useBlockSchemaCapabilitiesMock(count: number): string[] {
  const blockSchemaCapabilities = mocker.createMany('blockSchemaCapability', count)

  useSeeds({
    blockSchemaCapabilities,
  })

  return blockSchemaCapabilities
}