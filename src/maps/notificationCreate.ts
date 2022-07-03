
import { NotificationCreateRequest } from '@/models/api/NotificationCreateRequest'
import { NotificationCreate } from '@/models/NotificationCreate'
import { MapFunction } from '@/services/Mapper'
import { titleCase } from '@/utilities'

const convertToTitleCase = (array: string[]): string[] => array.map((stateName: string) => titleCase(stateName))

export const mapNotificationCreateToNotificationCreateRequest: MapFunction<NotificationCreate, NotificationCreateRequest> = function(source: NotificationCreate): NotificationCreateRequest {
  return {
    /* eslint-disable camelcase */
    state_names: convertToTitleCase(source.stateNames ?? []),
    tags: source.tags ?? [],
    is_active: true,
    block_document_id: source.blockDocumentId,
  }
}