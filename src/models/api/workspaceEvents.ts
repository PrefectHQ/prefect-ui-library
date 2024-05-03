export type WorkspaceEventResource = {
  'prefect.resource.id': string,
  'prefect.resource.role'?: string,
  'prefect.resource.name'?: string,
  'prefect.name'?: string,
  'prefect-cloud.name'?: string,
} & Record<string, string | undefined>

export type WorkspaceRelatedResource = WorkspaceEventResource & {
  'prefect.resource.role': string,
}

export type WorkspaceEventResponse = {
  id: string,
  account: string,
  event: string,
  occurred: string,
  payload: unknown,
  received: string,
  related: WorkspaceRelatedResource[],
  resource: WorkspaceEventResource,
  workspace: string | null,
}

export type WorkspaceEventsResponse = {
  events: WorkspaceEventResponse[],
  next_page: string | null,
  total: number,
}

export type WorkspaceEventsCountResponse = {
  count: number,
  label: string,
  value: string,
  start_time: string,
  end_time: string,
}