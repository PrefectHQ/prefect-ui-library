import { GraphTimelineNode } from '@prefecthq/graphs'

interface ModifiedGraphTimelineNode extends Omit<GraphTimelineNode, 'start'> {
  start: Date | null,
}

export function hasSubFlowRunId(node: GraphTimelineNode): node is GraphTimelineNode & { subFlowRunId: string } {
  return node.subFlowRunId !== undefined
}

export function isValidGraphTimelineNode(value: TimelineNode): value is GraphTimelineNode {
  return typeof value === 'object'
    && 'start' in value
    && value.start instanceof Date
}

export class TimelineNode implements ModifiedGraphTimelineNode {
  public readonly id: string
  public label: string
  public start: Date | null
  public end: Date | null
  public state: string
  public upstreamDependencies?: string[]
  public subFlowRunId?: string

  public constructor(timelineNode: TimelineNode) {
    this.id = timelineNode.id
    this.label = timelineNode.label
    this.start = timelineNode.start ?? null
    this.end = timelineNode.end ?? null
    this.state = timelineNode.state
    this.upstreamDependencies = timelineNode.upstreamDependencies
    this.subFlowRunId = timelineNode.subFlowRunId
  }
}
