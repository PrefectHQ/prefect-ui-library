import { IStateResponse } from './IStateResponse'
export interface INotificationRequest {
  name: string,
  is_active: boolean,
  state_names: IStateResponse[],
  tags: string[],
  block_document_id: string,
}