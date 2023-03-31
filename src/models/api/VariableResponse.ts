import { DateString } from '@/types'

export type VariableResponse = {
  id: string,
  name: string,
  value: string,
  tags: string[],
  created: DateString,
  updated: DateString,
}