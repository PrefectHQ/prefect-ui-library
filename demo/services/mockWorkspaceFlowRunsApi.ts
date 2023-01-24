import { MockApi } from '@/../demo/services/MockApi'
import { FlowRun, GraphNode, RunHistory, stateType, StateUpdate, TimelineNode } from '@/models'
import { FlowRunsFilter, FlowRunsHistoryFilter } from '@/models/Filters'
import { IWorkspaceFlowRunsApi, mocker } from '@/services'
import { dateFunctions } from '@/utilities/timezone'

export class MockWorkspaceFlowRunsApi extends MockApi implements IWorkspaceFlowRunsApi {

  public async getFlowRun(flowRunId: string): Promise<FlowRun> {
    return await this.flowRuns.get(flowRunId)
  }

  public async getFlowRuns(filter: FlowRunsFilter): Promise<FlowRun[]> {
    if (Object.keys(filter).length) {
      console.warn('MockWorkspaceFlowRunsApi has not implemented the filter argument of the getFlowRuns method')
    }

    return await this.flowRuns.getAll()
  }

  public async getFlowRunsCount(filter: FlowRunsFilter): Promise<number> {
    if (Object.keys(filter).length) {
      console.warn('MockWorkspaceFlowRunsApi has not implemented the filter argument of the getFlowRunsCount method')
    }

    return await this.flowRuns.count()
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

  public async getFlowRunsGraph(graphId: string): Promise<GraphNode[]> {
    return await this.flowRunGraphs.get(graphId).graph
  }

  public getFlowRunsTimeline(): Promise<TimelineNode[]> {
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