import { UpdatedByType } from '@/models/UpdatedBy'

export type UpdatedByResponse = {
  id: string,
  display_value: string,
  type: UpdatedByType,
}