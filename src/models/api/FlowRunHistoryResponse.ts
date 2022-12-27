import { StateHistoryResponse } from '@/models/api/StateHistoryResponse'

export type FlowRunHistoryResponse = {
  interval_start: string,
  interval_end: string,
  states: StateHistoryResponse[],
}