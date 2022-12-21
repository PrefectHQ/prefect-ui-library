import { Can, Permissions, canKey } from '@/services/can'
import { inject } from '@/utilities/inject'

export function useCan(): Can<Permissions> {
  return inject(canKey)
}