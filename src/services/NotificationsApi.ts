import { InjectionKey } from 'vue'
import { mapper } from './Mapper'
import { NotificationResponse } from '@/models/api/NotificationResponse'
import { Notification } from '@/models/Notification'
import { NotificationFilter } from '@/models/NotificationFilter'
import { NotificationFormValues } from '@/models/NotificationFormValues'
import { Api, ApiRoute } from '@/services/Api'

export class NotificationsApi extends Api {

  protected route: ApiRoute = '/flow_run_notification_policies'

  public getNotification(id: string): Promise<Notification> {
    return this.get<NotificationResponse>(`/${id}`)
      .then(({ data }) => mapper.map('NotificationResponse', data, 'Notification'))
  }

  public createNotification(notification: NotificationFormValues): Promise<Notification> {
    const request = mapper.map('NotificationFormValues', notification, 'NotificationCreateRequest')

    return this.post<NotificationResponse>('/', request)
      .then(({ data }) => mapper.map('NotificationResponse', data, 'Notification'))
  }

  public getNotifications(filter: NotificationFilter = {}): Promise<Notification[]> {
    return this.post<NotificationResponse[]>('/filter', filter)
      .then(({ data }) => mapper.map('NotificationResponse', data, 'Notification'))
  }

  public updateNotification(id: string, notification: NotificationFormValues): Promise<void> {
    const request = mapper.map('NotificationFormValues', notification, 'NotificationUpdateRequest')

    return this.patch(`/${id}`, request)
  }

  public deleteNotification(id: string): Promise<void> {
    return this.delete(`/${id}`)
  }
}

export const notificationsApiKey: InjectionKey<NotificationsApi> = Symbol('notificationsApiKey')