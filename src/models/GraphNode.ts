import { State } from '@/models/State'

export type TaskRunInputType = 'constant' | 'parameter' | 'task_run'

export interface IGraphNode {
  id: string,
  upstreamDependencies: {
    inputType: TaskRunInputType,
    id: string,
  }[],
  state: State | null,
  expectedStartTime: Date | null,
  estimatedRunTime: number | null,
  totalRunTime: number | null,
  startTime: Date | null,
  endTime: Date | null,
}

export class GraphNode implements IGraphNode {
  public readonly id: string
  public upstreamDependencies: { inputType: TaskRunInputType, id: string }[]
  public state: State | null
  public expectedStartTime: Date | null
  public estimatedRunTime: number | null
  public totalRunTime: number | null
  public startTime: Date | null
  public endTime: Date | null

  public constructor(graphNode: GraphNode) {
    this.id = graphNode.id
    this.upstreamDependencies = graphNode.upstreamDependencies
    this.state = graphNode.state
    this.expectedStartTime = graphNode.expectedStartTime
    this.estimatedRunTime = graphNode.estimatedRunTime
    this.totalRunTime = graphNode.totalRunTime
    this.startTime = graphNode.startTime
    this.endTime = graphNode.endTime
  }
}
