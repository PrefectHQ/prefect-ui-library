import { DateString } from '@/types'

export type VariableV2Response = {
  id: string,
  name: string,
  value: unknown,
  tags: string[] | null,
  created: DateString,
  updated: DateString,
}