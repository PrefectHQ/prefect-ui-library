import { GraphNode } from '@/models/GraphNode'
import { IFlowRunGraphResponse } from '@/models/IFlowRunGraphResponse'
import { MapFunction } from '@/services/Mapper'

export const mapIFlowRunGraphResponseToGraphNode: MapFunction<IFlowRunGraphResponse, GraphNode> = function(source: IFlowRunGraphResponse): GraphNode {
  return new GraphNode({
    id: source.id,
    expectedStartTime: this.map('string', source.expected_start_time, 'Date'),
    startTime: this.map('string', source.start_time, 'Date'),
    endTime: this.map('string', source.end_time, 'Date'),
    totalRunTime: source.total_run_time,
    estimatedRunTime: source.estimated_run_time,
    upstreamDependencies: source.upstream_dependencies.map(x => {
      return {
        id: x.id,
        inputType: x.input_type,
      }
    }),
    state: this.map('IStateResponse', source.state, 'IState'),
  })
}

export const mapGraphNodeToIFlowRunGraphResponse: MapFunction<GraphNode, IFlowRunGraphResponse> = function(source: GraphNode): IFlowRunGraphResponse {
  return {
    'id': source.id,
    'expected_start_time': this.map('Date', source.expectedStartTime, 'string'),
    'start_time': this.map('Date', source.startTime, 'string'),
    'end_time': this.map('Date', source.endTime, 'string'),
    'total_run_time': source.totalRunTime,
    'estimated_run_time': source.estimatedRunTime,
    'upstream_dependencies': source.upstreamDependencies.map(x => {
      return {
        'id': x.id,
        'input_type': x.inputType,
      }
    }),
    'state': this.map('IState', source.state!, 'IStateResponse'),
  }
}