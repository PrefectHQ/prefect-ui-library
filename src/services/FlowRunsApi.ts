import { InjectionKey } from 'vue'
import { FlowRun } from '@/models/FlowRun'
import { FlowRunGraphResponse } from '@/models/FlowRunGraphResponse'
import { FlowRunHistoryResponse } from '@/models/FlowRunHistoryResponse'
import { FlowRunResponse } from '@/models/FlowRunResponse'
import { GraphNode } from '@/models/GraphNode'
import { RunHistory } from '@/models/RunHistory'
import { ApiAxiosInstance, getBaseInstance } from '@/services/baseApi'
import { mapper } from '@/services/Mapper'
import { FlowRunsHistoryFilter, UnionFilters } from '@/types/UnionFilters'

const route = 'flow_runs'

export const getFlowRunKey: InjectionKey<typeof getFlowRun> = Symbol('getFlowRunKey')
export async function getFlowRun(id: string, getInstance: ApiAxiosInstance = getBaseInstance): Promise<FlowRun> {
  const instance = await getInstance(route)

  return instance.get<FlowRunResponse>(`/${id}`)
    .then(({ data }) => mapper.map('FlowRunResponse', data, 'FlowRun'))
}

export const getFlowRunsKey: InjectionKey<typeof getFlowRuns> = Symbol('getFlowRunsKey')
export async function getFlowRuns(filter: UnionFilters, getInstance: ApiAxiosInstance = getBaseInstance): Promise<FlowRun[]> {
  const instance = await getInstance(route)

  return instance.post<FlowRunResponse[]>('/filter', filter)
    .then(({ data }) => mapper.map('FlowRunResponse', data, 'FlowRun'))
}

export const getFlowRunsCountKey: InjectionKey<typeof getFlowRunsCount> = Symbol('getFlowRunsCountKey')
export async function getFlowRunsCount(filter: UnionFilters, getInstance: ApiAxiosInstance = getBaseInstance): Promise<number> {
  const instance = await getInstance(route)

  return instance.post<number>('/count', filter)
    .then(({ data }) => data)
}

export const getFlowRunsHistoryKey: InjectionKey<typeof getFlowRunsHistory> = Symbol('getFlowRunsHistoryKey')
export async function getFlowRunsHistory(filter: FlowRunsHistoryFilter, getInstance: ApiAxiosInstance = getBaseInstance): Promise<RunHistory[]> {
  const instance = await getInstance(route)

  return instance.post<FlowRunHistoryResponse[]>('/history', filter)
    .then(({ data }) => mapper.map('FlowRunHistoryResponse', data, 'RunHistory'))
}

export const getFlowRunsGraphKey: InjectionKey<typeof getFlowRunsGraph> = Symbol('getFlowRunsGraphKey')
export async function getFlowRunsGraph(id: string, getInstance: ApiAxiosInstance = getBaseInstance): Promise<GraphNode[]> {
  const instance = await getInstance(route)

  return instance.get<FlowRunGraphResponse[]>(`/${id}/graph`)
    .then(({ data }) => mapper.map('FlowRunGraphResponse', data, 'GraphNode'))
}

export const deleteFlowRunKey: InjectionKey<typeof deleteFlowRun> = Symbol('deleteFlowRunKey')
export async function deleteFlowRun(flowRunId: string, getInstance: ApiAxiosInstance = getBaseInstance): Promise<void> {
  const instance = await getInstance(route)

  return instance.delete(`/${flowRunId}`)
}