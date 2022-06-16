import { createActions } from '@prefecthq/vue-compositions'
import { MockedApi } from './MockedApi'
import { INotificationRequest, INotificationUpdateRequest } from '@/models/INotificationRequest'
import { Notification } from '@/models/Notification'
import { NotificationFilter } from '@/models/NotificationFilter'
import { mocker } from '@/services'

export class NotificationsApi extends MockedApi {
  public getNotification(id: string): Promise<Notification> {
    return this.promise(mocker.create('notification', [{ id: id }]))
  }

  public createNotification(notification: INotificationRequest): Promise<Notification> {
    return this.promise(mocker.create('notification', [notification]))
  }

  public getNotifications(filter: NotificationFilter): Promise<Notification[]> {
    return this.promise(mocker.createMany('notification', mocker.create('number', [1, 10])))
  }

  public updateNotification(id: string, notification: INotificationUpdateRequest): Promise<Notification> {
    return this.promise(mocker.create('notification', [notification]))
  }

  public deleteNotification(id: string): Promise<void> {
    return this.void()
  }
}

export const notificationsApi = createActions(new NotificationsApi())