export class NotificationCreateRequestError extends Error {
  public constructor() {
    super('error creating NotificationCreateRequest without blockDocumentId')
  }
}
