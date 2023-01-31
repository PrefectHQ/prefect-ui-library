import { TimelineNodeData } from '@prefecthq/graphs'

interface ModifiedTimelineNodeData extends Omit<TimelineNodeData, 'start'> {
  start: Date | null,
}

export function isValidTimelineNodeData(value: TimelineNode): value is TimelineNodeData {
  return typeof value === 'object'
    && 'start' in value
    && value.start instanceof Date
}

export class TimelineNode implements ModifiedTimelineNodeData {
  public readonly id: string
  public label: string
  public start: Date | null
  public end: Date | null
  public state: string
  public upstreamDependencies?: string[]

  public constructor(timelineNode: TimelineNode) {
    this.id = timelineNode.id
    this.label = timelineNode.label
    this.start = timelineNode.start ?? null
    this.end = timelineNode.end ?? null
    this.state = timelineNode.state
    this.upstreamDependencies = timelineNode.upstreamDependencies
  }
}
