import { StateHistoryResponse } from '@/models/StateHistoryResponse'

export type FlowRunHistoryResponse = {
  interval_start: string,
  interval_end: string,
  states: StateHistoryResponse[],
}