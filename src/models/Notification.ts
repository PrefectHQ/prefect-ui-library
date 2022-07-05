export const notificationStatus = ['all', 'active', 'paused'] as const
export type NotificationStatus = typeof notificationStatus[number]

export interface INotification {
  id: string,
  created: Date,
  updated: Date,
  isActive: boolean,
  stateNames: string[],
  tags: string[],
  blockDocumentId: string,
}

export class Notification implements INotification {
  public readonly id: string
  public created: Date
  public updated: Date
  public isActive: boolean
  public stateNames: string[]
  public tags: string[]
  public blockDocumentId: string

  public constructor(notification: INotification) {
    this.id = notification.id
    this.created = notification.created
    this.updated = notification.updated
    this.isActive = notification.isActive
    this.stateNames = notification.stateNames
    this.tags = notification.tags
    this.blockDocumentId = notification.blockDocumentId
  }
}