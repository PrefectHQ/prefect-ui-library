import { NotificationResponse } from '@/models/api/NotificationResponse'
import { Notification } from '@/models/Notification'
import { NotificationCreate } from '@/models/NotificationCreate'
import { NotificationFilter } from '@/models/NotificationFilter'
import { NotificationUpdate } from '@/models/NotificationUpdate'
import { mapper } from '@/services/Mapper'
import { WorkspaceApi } from '@/services/WorkspaceApi'

export class WorkspaceNotificationsApi extends WorkspaceApi {

  protected routePrefix = '/flow_run_notification_policies'

  public async getNotification(id: string): Promise<Notification> {
    const { data } = await this.get<NotificationResponse>(`/${id}`)

    return mapper.map('NotificationResponse', data, 'Notification')
  }

  public async createNotification(notification: NotificationCreate): Promise<Notification> {
    const { data } = await this.post<NotificationResponse>('/', mapper.map('NotificationCreate', notification, 'NotificationCreateRequest'))

    return mapper.map('NotificationResponse', data, 'Notification')
  }

  public async getNotifications(filter: NotificationFilter = {}): Promise<Notification[]> {
    const { data } = await this.post<NotificationResponse[]>('/filter', filter)

    return mapper.map('NotificationResponse', data, 'Notification')
  }

  public updateNotification(id: string, notification: NotificationUpdate): Promise<void> {
    return this.patch(`/${id}`, mapper.map('NotificationUpdate', notification, 'NotificationUpdateRequest'))
  }

  public deleteNotification(id: string): Promise<void> {
    return this.delete(`/${id}`)
  }
}