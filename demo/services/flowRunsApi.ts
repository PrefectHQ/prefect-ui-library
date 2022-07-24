import { createActions } from '@prefecthq/vue-compositions'
import { MockedApi } from './MockedApi'
import { GraphNode } from '@/models'
import { FlowRun } from '@/models/FlowRun'
import { RunHistory } from '@/models/RunHistory'
import { mocker } from '@/services'
import { UnionFilters, FlowRunsHistoryFilter } from '@/types/UnionFilters'

export class FlowRunsApi extends MockedApi {
  public getFlowRun(id: string): Promise<FlowRun> {
    return this.promise(mocker.create('flowRun', [{ id: id }]))
  }

  public getFlowRuns(filter: UnionFilters): Promise<FlowRun[]> {
    return this.promise(mocker.createMany('flowRun', 20))
  }

  public getFlowRunsCount(filter: UnionFilters): Promise<number> {
    return this.promise(mocker.create('number'))
  }

  public getFlowRunsHistory(filter: FlowRunsHistoryFilter): Promise<RunHistory[]> {
    const start = new Date(filter.history_start)
    const end = new Date(filter.history_end)
    const interval = filter.history_interval_seconds

    const runsHistory = []
    let curr = start.getTime()

    while (curr < end.getTime()) {
      const currDate = new Date(curr)
      const nextDate = new Date(curr + interval * 1000)
      runsHistory.push(
        mocker.create('flowRunHistory', [{ intervalStart: currDate, intervalEnd: nextDate }]),
      )

      curr = nextDate.getTime()
    }

    return this.promise(runsHistory)
  }

  public getFlowRunsGraph(id: string): Promise<GraphNode[]> {
    return this.promise(mocker.create('flowRunGraph', [{ size: mocker.create('number', [3, 40]), shape: 'fanOut', fanMultiplier: 2 }]))
  }

  public deleteFlowRun(id: string): Promise<void> {
    return this.void()
  }
}

export const flowRunsApi = createActions(new FlowRunsApi())