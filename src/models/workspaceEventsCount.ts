import { removePrefectEventLabelPrefix } from '@/utilities/events'

export type WorkspaceEventsCountable = 'day' | 'event' | 'workspace' | 'actor' | 'resource'

export type IWorkspaceEventsCount = {
  count: number,
  label: string,
  value: string,
  startTime: Date,
  endTime: Date,
}

export class WorkspaceEventsCount implements IWorkspaceEventsCount {
  public count: number
  public label: string
  public value: string
  public startTime: Date
  public endTime: Date

  public constructor(count: IWorkspaceEventsCount) {
    this.count = count.count
    this.label = count.label
    this.value = count.value
    this.startTime = count.startTime
    this.endTime = count.endTime
  }

  public get eventPrefectWithoutPrefix(): string {
    return removePrefectEventLabelPrefix(this.label)
  }
}