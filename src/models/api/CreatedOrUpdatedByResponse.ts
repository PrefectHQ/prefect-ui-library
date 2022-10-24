import { CreatedOrUpdatedByType } from '@/models/CreatedOrUpdatedBy'

export type CreatedOrUpdatedByResponse = {
  id: string,
  display_value: string,
  type: CreatedOrUpdatedByType,
}