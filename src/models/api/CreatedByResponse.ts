import { CreatedByType } from '@/models/CreatedBy'

export type CreatedByResponse = {
  id: string,
  display_value: string,
  type: CreatedByType,
}