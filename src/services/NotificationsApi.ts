import { InjectionKey } from 'vue'
import { INotificationRequest } from '@/models/INotificationRequest'
import { INotificationResponse } from '@/models/INotificationResponse'
import { Notification } from '@/models/Notification'
import { Api, ApiRoute } from '@/services/Api'
import { mapper } from '@/services/Mapper'
import { UnionFilters } from '@/types/UnionFilters'

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

  public getNotifications(filter: UnionFilters): Promise<Notification[]> {
    return this.post<INotificationResponse[]>('/filter', filter)
      .then(({ data }) => mapper.map('INotificationResponse', data, 'Notification'))
  }

  public getNotificationsCount(filter: UnionFilters): Promise<number> {
    return this.post<number>('/count', filter).then(({ data }) => data)
  }

  public deleteNotification(NotificationId: string): Promise<void> {
    return this.delete(`/${NotificationId}`)
  }
}

export const notificationsApiKey: InjectionKey<NotificationsApi> = Symbol('notificationsApiKey')