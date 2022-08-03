import { IStateRequest, Parameters } from '@/models'

export type IFlowRunRequest = Partial<{
  name?: string,
  parameters?: Parameters,
  tags?: string[],
  state?: IStateRequest,
}>