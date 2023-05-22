import { Notification } from '@/models/Notification'
import { IWorkspaceNotificationsApi } from '@/services/WorkspaceNotificationsApi'

export class MockWorkspaceNotificationsApi implements IWorkspaceNotificationsApi {

  public getNotification(): Promise<Notification> {
    throw new Error('Not Implemented')
  }

  public createNotification(): Promise<Notification> {
    throw new Error('Not Implemented')
  }

  public getNotifications(): Promise<Notification[]> {
    throw new Error('Not Implemented')
  }

  public updateNotification(): Promise<void> {
    throw new Error('Not Implemented')
  }

  public deleteNotification(): Promise<void> {
    throw new Error('Not Implemented')
  }

}