export type NotificationResponse = {
  id: string,
  created: string,
  updated: string,
  is_active: boolean,
  state_names: string[],
  tags: string[],
  block_document_id: string,
}