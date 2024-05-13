import { WorkspaceEvent } from '@/models/workspaceEvent'

export type IWorkspaceEvents = {
  events: WorkspaceEvent[],
  nextPage: string | null,
  total: number,
}

export class WorkspaceEvents {
  public events: WorkspaceEvent[]
  public nextPage: string | null
  public total: number

  public constructor(eventStream: IWorkspaceEvents) {
    this.events = eventStream.events
    this.nextPage = eventStream.nextPage
    this.total = eventStream.total
  }

  public get nextPageToken(): string | null {
    if (this.nextPage === null) {
      return null
    }

    return this.nextPage.split('next')[1]
  }

  public get pages(): number {
    if (this.events.length === 0) {
      return 0
    }

    return Math.ceil(this.total / 50)
  }

}
