import { DateString } from '@/types'

export type VariableResponse = {
  id: string,
  name: string,
  value: unknown,
  tags: string[] | null,
  created: DateString,
  updated: DateString,
}