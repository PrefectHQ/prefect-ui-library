import { FlowRun, FlowRunResponse } from '@/models'
import { Paginated } from '@/models/pagination'
import { MapFunction } from '@/services'

export const mapFlowRunsPaginationResponseToFlowRunsPagination: MapFunction<Paginated<FlowRunResponse>, Paginated<FlowRun>> = function(source) {
  const results = this.map('FlowRunResponse', source.results, 'FlowRun')

  return {
    ...source,
    results,
  }
}