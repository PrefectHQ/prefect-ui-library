import { FlowRunnerType } from '@/types'

export type IFlowRunnerResponse = {
  type: FlowRunnerType,
  config: unknown,
}