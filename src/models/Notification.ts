import { IState } from './State'
export interface INotification {
  id: string,
  created: Date,
  updated: Date,
  name: string,
  isActive: boolean,
  states: IState[],
  tags: string[],
  blockDocumentId: string,
}

export class Notification implements INotification {
  public readonly id: string
  public created: Date
  public updated: Date
  public name: string
  public isActive: boolean
  public states: IState[]
  public tags: string[]
  public blockDocumentId: string

  public constructor(notification: INotification) {
    this.id = notification.id
    this.created = notification.created
    this.updated = notification.updated
    this.name = notification.name
    this.isActive = notification.isActive
    this.states = notification.states
    this.tags = notification.tags
    this.blockDocumentId = notification.blockDocumentId
  }
}