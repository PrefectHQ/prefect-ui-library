import { InjectionKey } from 'vue'
import { mapper } from './Mapper'
import { NotificationResponse } from '@/models/api/NotificationResponse'
import { Notification } from '@/models/Notification'
import { NotificationCreate } from '@/models/NotificationCreate'
import { NotificationFilter } from '@/models/NotificationFilter'
import { NotificationUpdate } from '@/models/NotificationUpdate'
import { Api, ApiRoute } from '@/services/Api'

/**
 * @deprecated
 */
export class NotificationsApi extends Api {

  protected route: ApiRoute = '/flow_run_notification_policies'

  public getNotification(id: string): Promise<Notification> {
    return this.get<NotificationResponse>(`/${id}`)
      .then(({ data }) => mapper.map('NotificationResponse', data, 'Notification'))
  }

  public createNotification(notification: NotificationCreate): Promise<Notification> {
    return this.post<NotificationResponse>('/', mapper.map('NotificationCreate', notification, 'NotificationCreateRequest'))
      .then(({ data }) => mapper.map('NotificationResponse', data, 'Notification'))
  }

  public getNotifications(filter: NotificationFilter = {}): Promise<Notification[]> {
    return this.post<NotificationResponse[]>('/filter', filter)
      .then(({ data }) => mapper.map('NotificationResponse', data, 'Notification'))
  }

  public updateNotification(id: string, notification: NotificationUpdate): Promise<void> {
    return this.patch(`/${id}`, mapper.map('NotificationUpdate', notification, 'NotificationUpdateRequest'))
  }

  public deleteNotification(id: string): Promise<void> {
    return this.delete(`/${id}`)
  }
}

/**
 * @deprecated
 */
export const notificationsApiKey: InjectionKey<NotificationsApi> = Symbol('notificationsApiKey')