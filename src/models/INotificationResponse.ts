import { IStateResponse } from './IStateResponse'
export interface INotificationResponse {
  id: string,
  created: string,
  updated: string,
  name: string,
  is_active: boolean,
  states: IStateResponse[],
  tags: string[],
  block_document_id: string,
}