import { FlowRunInputKeysetResponse } from '@/models/api/FlowRunInputKeysetResponse'
import { FlowRunInputKeyset } from '@/models/FlowRunInputKeyset'
import { MapFunction } from '@/services/Mapper'

export const mapFlowRunInputKeysetResponseToFlowRunInputKeyset: MapFunction<FlowRunInputKeysetResponse, FlowRunInputKeyset> = function(source) {
  return {
    description: source.description,
    response: source.response,
    schema: source.schema,
  }
}

export const mapFlowRunInputKeysetToFlowRunInputKeysetResponse: MapFunction<FlowRunInputKeyset, FlowRunInputKeysetResponse> = function(source) {
  return {
    description: source.description,
    response: source.response,
    schema: source.schema,
  }
}
