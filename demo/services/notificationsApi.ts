import { createActions } from '@prefecthq/vue-compositions'
import { MockedApi } from './MockedApi'
import { INotificationRequest } from '@/models/INotificationRequest'
import { Notification } from '@/models/Notification'
import { mocker } from '@/services'
import { UnionFilters } from '@/types/UnionFilters'

export class NotificationsApi extends MockedApi {
  public getNotification(id: string): Promise<Notification> {
    return this.promise(mocker.create('notification', [{ id: id }]))
  }

  public createNotification(notification: INotificationRequest): Promise<Notification> {
    return this.promise(mocker.create('notification', [notification]))
  }

  public getNotifications(filter: UnionFilters): Promise<Notification[]> {
    return this.promise(mocker.createMany('notification', mocker.create('number', [1, 10])))
  }

  public deleteNotification(id: string): Promise<void> {
    return this.void()
  }
}

export const notificationsApi = createActions(new NotificationsApi())