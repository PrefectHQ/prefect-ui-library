import { NotificationResponse } from '@/models/api/NotificationResponse'
import { NotificationsFilter } from '@/models/Filters'
import { Notification } from '@/models/Notification'
import { NotificationCreate } from '@/models/NotificationCreate'
import { NotificationUpdate } from '@/models/NotificationUpdate'
import { mapper } from '@/services/Mapper'
import { WorkspaceApi } from '@/services/WorkspaceApi'

export class WorkspaceNotificationsApi extends WorkspaceApi {

  protected override routePrefix = '/flow_run_notification_policies'

  public async getNotification(notificationId: string): Promise<Notification> {
    const { data } = await this.get<NotificationResponse>(`/${notificationId}`)

    return mapper.map('NotificationResponse', data, 'Notification')
  }

  public async createNotification(notification: NotificationCreate): Promise<Notification> {
    const { data } = await this.post<NotificationResponse>('/', mapper.map('NotificationCreate', notification, 'NotificationCreateRequest'))

    return mapper.map('NotificationResponse', data, 'Notification')
  }

  public async getNotifications(filter: NotificationsFilter = {}): Promise<Notification[]> {
    const request = mapper.map('NotificationsFilter', filter, 'NotificationsFilterRequest')
    const { data } = await this.post<NotificationResponse[]>('/filter', request)

    return mapper.map('NotificationResponse', data, 'Notification')
  }

  public updateNotification(notificationId: string, notification: NotificationUpdate): Promise<void> {
    return this.patch(`/${notificationId}`, mapper.map('NotificationUpdate', notification, 'NotificationUpdateRequest'))
  }

  public deleteNotification(notificationId: string): Promise<void> {
    return this.delete(`/${notificationId}`)
  }
}