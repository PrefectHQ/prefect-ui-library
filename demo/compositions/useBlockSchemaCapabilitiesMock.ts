import { useSeeds } from './useSeeds'
import { mocker } from '@/services'
import { repeat } from '@/utilities/arrays'

export function useBlockSchemaCapabilityMock(): string {
  const capability = mocker.create('blockSchemaCapability')

  useSeeds({
    blockSchemaCapabilities: [capability],
  })

  return capability
}

export function useBlockSchemaCapabilitiesMock(count: number): string[] {
  return repeat(count, () => useBlockSchemaCapabilityMock())
}