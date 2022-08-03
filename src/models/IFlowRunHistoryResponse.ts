import { StateHistoryResponse } from '@/models/StateHistoryResponse'

export type IFlowRunHistoryResponse = {
  interval_start: string,
  interval_end: string,
  states: StateHistoryResponse[],
}