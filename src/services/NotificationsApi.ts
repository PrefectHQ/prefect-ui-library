import { InjectionKey } from 'vue'
import { INotificationRequest } from '@/models/INotificationRequest'
import { INotificationResponse } from '@/models/INotificationResponse'
import { Notification } from '@/models/Notification'
import { NotificationFilter } from '@/models/NotificationFilter'
import { Api, ApiRoute } from '@/services/Api'
import { mapper } from '@/services/Mapper'

export class NotificationsApi extends Api {

  protected route: ApiRoute = '/flow_run_notification_policies'

  public getNotification(id: string): Promise<Notification> {
    return this.get<INotificationResponse>(`/${id}`)
      .then(({ data }) => mapper.map('INotificationResponse', data, 'Notification'))
  }

  public createNotification(notification: INotificationRequest): Promise<Notification> {
    return this.post<INotificationResponse>('/', notification)
      .then(({ data }) => mapper.map('INotificationResponse', data, 'Notification'))
  }

  public getNotifications(filter: NotificationFilter): Promise<Notification[]> {
    return this.post<INotificationResponse[]>('/filter', filter)
      .then(({ data }) => mapper.map('INotificationResponse', data, 'Notification'))
  }

  public updateNotification(id: string, notification: INotificationRequest): Promise<Notification> {
    return this.patch<INotificationResponse>(`/${id}`, notification)
      .then(({ data }) => mapper.map('INotificationResponse', data, 'Notification'))
  }

  public deleteNotification(id: string): Promise<void> {
    return this.delete(`/${id}`)
  }
}

export const notificationsApiKey: InjectionKey<NotificationsApi> = Symbol('notificationsApiKey')