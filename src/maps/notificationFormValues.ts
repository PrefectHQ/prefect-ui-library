
import { NotificationCreateRequest } from '@/models/api/NotificationCreateRequest'
import { NotificationUpdateRequest } from '@/models/api/NotificationUpdateRequest'
import { NotificationCreateRequestError } from '@/models/NotificationCreateRequestError'
import { NotificationFormValues } from '@/models/NotificationFormValues'
import { MapFunction } from '@/services/Mapper'
import { titleCase } from '@/utilities'

const convertToTitleCase = (array: string[]): string[] => array.map((stateName: string) => titleCase(stateName))

export const mapNotificationFormValuesToNotificationCreateRequest: MapFunction<NotificationFormValues, NotificationCreateRequest> = function(source: NotificationFormValues): NotificationCreateRequest {
  if (!source.blockDocumentId) {
    throw new NotificationCreateRequestError()
  }

  return {
    /* eslint-disable camelcase */
    state_names: convertToTitleCase(source.stateNames ?? []),
    tags: source.tags ?? [],
    is_active: true,
    block_document_id: source.blockDocumentId,
  }
}

export const mapNotificationFormValuesToNotificationUpdateRequest: MapFunction<NotificationFormValues, NotificationUpdateRequest> = function(source: NotificationFormValues): NotificationUpdateRequest {
  return {
    /* eslint-disable camelcase */
    state_names: convertToTitleCase(source.stateNames ?? []),
    tags: source.tags,
    is_active: source.isActive,
    block_document_id: source.blockDocumentId,
  }
}