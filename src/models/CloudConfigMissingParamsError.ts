export class CloudConfigMissingParamsError extends Error {
  public constructor() {
    super('Cannot call workspace routes without providing AccountId and WorkspaceId in api configuration.')
  }
}