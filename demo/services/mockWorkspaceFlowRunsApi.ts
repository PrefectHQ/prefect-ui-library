import { GraphTimelineNode } from '@prefecthq/graphs'
import { KeyedDataStoreFindCallback } from './KeyedDataStore'
import { MockApi } from '@/../demo/services/MockApi'
import { FlowRun, GraphNode, RunHistory, stateType, StateUpdate } from '@/models'
import { FlowRunsFilter, FlowRunsHistoryFilter } from '@/models/Filters'
import { IWorkspaceFlowRunsApi, mocker } from '@/services'
import { dateFunctions } from '@/utilities/timezone'

const flowRunsItemIntersectsFilter = (filter: FlowRunsFilter): KeyedDataStoreFindCallback<FlowRun> => {
  return (flowRun: FlowRun): boolean => {
    let filtered = false

    if (filter.flows?.id?.length && flowRun.flowId) {
      filtered = !filter.flows.id.includes(flowRun.flowId)
    }

    if (!filtered && filter.flowRuns?.id?.length) {
      filtered = !filter.flowRuns.id.includes(flowRun.id)
    }

    if (!filtered && filter.flowRuns?.name?.length && flowRun.name) {
      filtered = !filter.flowRuns.name.includes(flowRun.name)
    }

    if (!filtered && filter.flowRuns?.state && flowRun.state) {
      const { state } = flowRun
      const type = state.type.toUpperCase()
      const name = state.name.toUpperCase()

      if (filter.flowRuns.state.type?.length) {
        filtered = !filter.flowRuns.state.type.includes(type)
      }

      if (!filtered && filter.flowRuns.state.name?.length) {
        filtered = !filter.flowRuns.state.name.includes(name)
      }
    }

    if (!filtered && filter.deployments?.id?.length && flowRun.deploymentId) {
      filtered = !filter.deployments.id.includes(flowRun.deploymentId)
    }

    return !filtered
  }
}

export class MockWorkspaceFlowRunsApi extends MockApi implements IWorkspaceFlowRunsApi {

  public async getFlowRun(flowRunId: string): Promise<FlowRun> {
    return await this.flowRuns.get(flowRunId)
  }

  /**
   * WARNING: Not all filter arguments have been implemented for the getFlowRuns method... feel free to add any missing filters :)
   */
  public async getFlowRuns(filter: FlowRunsFilter): Promise<FlowRun[]> {
    const { limit = 200, offset = 0, sort = 'CREATED_DESC' } = filter
    let flowRuns = await this.flowRuns.findAll(flowRunsItemIntersectsFilter(filter))

    switch (sort) {
      /* eslint-disable id-length */
      case 'CREATED_DESC':
        flowRuns = flowRuns.sort((a, b) => b.created.getTime() - a.created.getTime())
        break
      case 'NAME_ASC':
        flowRuns = flowRuns.sort((a, b) => a.name?.localeCompare(b.name ?? '') ?? 0)
        break
      case 'NAME_DESC':
        flowRuns = flowRuns.sort((a, b) => b.name?.localeCompare(a.name ?? '') ?? 0)
        break
      case 'START_TIME_DESC':
        flowRuns = flowRuns.sort((a, b) => (b.startTime?.getTime() ?? 0) - (a.startTime?.getTime() ?? 0))
        break
      case 'START_TIME_ASC':
        flowRuns = flowRuns.sort((a, b) => (a.startTime?.getTime() ?? 0) - (b.startTime?.getTime() ?? 0))
        break
      case 'EXPECTED_START_TIME_DESC':
        flowRuns = flowRuns.sort((a, b) => (b.expectedStartTime?.getTime() ?? 0) - (a.expectedStartTime?.getTime() ?? 0))
        break
      case 'EXPECTED_START_TIME_ASC':
        flowRuns = flowRuns.sort((a, b) => (a.expectedStartTime?.getTime() ?? 0) - (b.expectedStartTime?.getTime() ?? 0))
        break
      default:
        console.warn(`MockWorkspaceFlowRunsApi has not implemented the sort argument for ${sort} of the getFlowRuns method`)
        break
      /* eslint-enable id-length */
    }

    flowRuns = flowRuns.slice(offset, offset + limit)
    return flowRuns
  }

  /**
   * WARNING: Not all filter arguments have been implemented for the getFlowRunsCount method... feel free to add any missing filters :)
   */
  public async getFlowRunsCount(filter: FlowRunsFilter): Promise<number> {
    return await this.flowRuns.count(flowRunsItemIntersectsFilter(filter))
  }

  public getFlowRunsHistory(filter: FlowRunsHistoryFilter): Promise<RunHistory[]> {
    let start = filter.historyStart
    const end = filter.historyEnd
    const runHistory: RunHistory[] = []

    while (dateFunctions.isBefore(start, end)) {
      const intervalEnd = dateFunctions.addSeconds(start, filter.historyIntervalSeconds)

      runHistory.push({
        intervalStart: start,
        intervalEnd,
        states: stateType.map(stateType => mocker.create('flowRunStateHistory', [
          {
            stateType,
            countRuns: mocker.create('number', [-2, 1]),
          },
        ])),
      })
      start = intervalEnd
    }

    return Promise.resolve(runHistory)
  }

  public getFlowRunsAverageLateness(filter: FlowRunsFilter): Promise<number | null> {
    throw new Error('MockWorkspaceFlowRunsApi has not implemented the getFlowRunsAverageLateness method')
  }

  public async getFlowRunsGraph(graphId: string): Promise<GraphNode[]> {
    return await this.flowRunGraphs.get(graphId).graph
  }

  public getFlowRunsTimeline(): Promise<GraphTimelineNode[]> {
    throw new Error('MockWorkspaceFlowRunsApi has not implemented the getFlowRunGraph method')
  }

  public async retryFlowRun(): Promise<void> {
    return await Promise.resolve()
  }

  public async setFlowRunState(flowRunId: string, body: StateUpdate): Promise<void> {
    const flowRun = this.flowRuns.get(flowRunId)
    flowRun.state = mocker.create('state', [body.state])
    flowRun.stateType = flowRun.state.type

    return await Promise.resolve()
  }

  public resumeFlowRun(flowRunId: string): Promise<void> {
    const flowRun = this.flowRuns.get(flowRunId)
    flowRun.stateType = 'running'

    this.flowRuns.patch(flowRunId, flowRun)

    return Promise.resolve()
  }

  public async deleteFlowRun(flowRunId: string): Promise<void> {
    return await this.flowRuns.delete(flowRunId)
  }

}