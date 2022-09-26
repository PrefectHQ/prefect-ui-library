import { Can, canKey } from '@/types/permissions'
import { inject } from '@/utilities/inject'

export function useCan(): Can {
  return inject(canKey)
}