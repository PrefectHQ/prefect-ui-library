import { CreateFlowRun, CreateFlowRunRequest } from '@/models/CreateFlowRun'
import { MapFunction } from '@/services/Mapper'

export const mapCreateFlowRunToCreateFlowRunRequest: MapFunction<CreateFlowRun, CreateFlowRunRequest> = function(source: CreateFlowRun): CreateFlowRunRequest {
  return {
    name: source.name,
    parameters: source.parameters,
    tags: source.tags,
    state: {
      type: this.map('StateType', source.state.type, 'ServerStateType'),
      message: source.state.message,
      'scheduled_time': source.state.scheduledTime?.toISOString(),
    },
  }
}