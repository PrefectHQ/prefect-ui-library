import { HistogramData } from '@prefecthq/vue-charts'
import { WorkspaceEventsCountResponse, WorkspaceEventsResponse } from '@/models/api/workspaceEvents'
import { WorkspaceEvent } from '@/models/workspaceEvent'
import { WorkspaceEvents } from '@/models/workspaceEvents'
import { WorkspaceEventsCount, WorkspaceEventsCountable } from '@/models/workspaceEventsCount'
import { mapper } from '@/services/Mapper'
import { WorkspaceApi } from '@/services/WorkspaceApi'
import { WorkspaceEventsFilter } from '@/types/workspaceEventsFilter'
import { WorkspaceEventsHistory } from '@/types/workspaceEventsHistory'
import { dateFunctions } from '@/utilities/timezone'

export class WorkspaceEventsApi extends WorkspaceApi {

  protected override routePrefix = '/events'

  public async getEvents(filter: WorkspaceEventsFilter): Promise<WorkspaceEvents> {
    const request = mapper.map('WorkspaceEventsFilter', filter, 'WorkspaceEventsFilterRequest')
    const { data } = await this.post<WorkspaceEventsResponse>('/filter', request)

    return mapper.map('WorkspaceEventsResponse', data, 'WorkspaceEvents')
  }

  public async getEvent(eventId: string, occurred: Date): Promise<WorkspaceEvent> {
    const since = dateFunctions.startOfDay(occurred)
    const until = dateFunctions.endOfDay(occurred)

    const filter: WorkspaceEventsFilter = {
      id: { id: [eventId] },
      occurred: {
        since,
        until,
      },
    }

    const { events } = await this.getEvents(filter)
    const [event] = events

    return event
  }

  public async getFirstEvent(filter: WorkspaceEventsFilter): Promise<WorkspaceEvent> {
    const { events } = await this.getEvents(filter)
    const [event] = events

    return event
  }

  public async getNextPage(pageToken: string): Promise<WorkspaceEvents> {
    const { data } = await this.get<WorkspaceEventsResponse>(`/filter/next${pageToken}`)

    return mapper.map('WorkspaceEventsResponse', data, 'WorkspaceEvents')
  }

  public async getEventsCount(countable: WorkspaceEventsCountable, filter: WorkspaceEventsFilter): Promise<WorkspaceEventsCount[]> {
    const request = mapper.map('WorkspaceEventsFilter', filter, 'WorkspaceEventsFilterRequest')
    const { data } = await this.post<WorkspaceEventsCountResponse[]>(`/count-by/${countable}`, request)

    return mapper.map('WorkspaceEventsCountResponse', data, 'WorkspaceEventsCount')
  }

  public async getEventsHistory(eventsHistory: WorkspaceEventsHistory): Promise<HistogramData> {
    const { unit = 'hour', interval = 1 } = eventsHistory
    const request = mapper.map('WorkspaceEventsHistory', { ...eventsHistory, unit, interval }, 'WorkspaceEventsHistoryRequest')
    const { data } = await this.post<WorkspaceEventsCountResponse[]>('/count-by/time', request)

    return mapper.map('WorkspaceEventsCountResponse', data, 'HistogramDataPoint')
  }

}
