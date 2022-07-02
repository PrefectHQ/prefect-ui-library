export type NotificationCreateRequest = {
  is_active: boolean,
  state_names: string[],
  tags: string[],
  block_document_id: string,
}