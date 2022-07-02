import { InjectionKey } from 'vue'
import { mapper } from './Mapper'
import { INotificationResponse } from '@/models/INotificationResponse'
import { Notification } from '@/models/Notification'
import { NotificationCreate } from '@/models/NotificationCreate'
import { NotificationFilter } from '@/models/NotificationFilter'
import { NotificationUpdate } from '@/models/NotificationUpdate'
import { Api, ApiRoute } from '@/services/Api'

export class NotificationsApi extends Api {

  protected route: ApiRoute = '/flow_run_notification_policies'

  public getNotification(id: string): Promise<Notification> {
    return this.get<INotificationResponse>(`/${id}`)
      .then(({ data }) => mapper.map('INotificationResponse', data, 'Notification'))
  }

  public createNotification(notification: NotificationCreate): Promise<Notification> {
    return this.post<INotificationResponse>('/', mapper.map('NotificationCreate', notification, 'NotificationCreateRequest'))
      .then(({ data }) => mapper.map('INotificationResponse', data, 'Notification'))
  }

  public getNotifications(filter: NotificationFilter = {}): Promise<Notification[]> {
    return this.post<INotificationResponse[]>('/filter', filter)
      .then(({ data }) => mapper.map('INotificationResponse', data, 'Notification'))
  }

  public updateNotification(id: string, notification: NotificationUpdate): Promise<void> {
    return this.patch(`/${id}`, mapper.map('NotificationUpdate', notification, 'NotificationUpdateRequest'))
  }

  public deleteNotification(id: string): Promise<void> {
    return this.delete(`/${id}`)
  }
}

export const notificationsApiKey: InjectionKey<NotificationsApi> = Symbol('notificationsApiKey')