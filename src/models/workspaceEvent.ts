import { capitalize } from 'vue'
import { WorkspaceRelatedResource, WorkspaceEventResource } from '@/models/api/workspaceEvents'
import { formatDate, formatDateTimeNumeric, formatTimeNumeric } from '@/utilities/dates'
import { removePrefectEventLabelPrefix } from '@/utilities/events'
import { createTuple } from '@/utilities/tuples'

export const { values: prefectEventPrefixes } = createTuple([
  'prefect-cloud.actor',
  'prefect-cloud.automation',
  'prefect-cloud.workspace',
  'prefect-cloud.webhook',
  'prefect.block-document',
  'prefect.deployment',
  'prefect.flow-run',
  'prefect.flow',
  'prefect.task-run',
  'prefect.work-queue',
  'prefect.work-pool',
  'prefect.tag',
  'prefect.concurrency-limit',
  'prefect.artifact-collection',
  'prefect.creator',
])
export type PrefectEventPrefixes = typeof prefectEventPrefixes[number]

export const prefectResourceRoles = prefectEventPrefixes.map(prefix => prefix.split('.').at(-1)!)
export type PrefectResourceRole = PrefectEventPrefixes extends `${string}.${infer T}` ? T : never

export function isPrefectResourceRole(value: unknown): value is PrefectResourceRole {
  return prefectResourceRoles.includes(value as PrefectResourceRole)
}

export type IWorkspaceEvent = {
  id: string,
  account: string,
  event: string,
  occurred: Date,
  payload: unknown,
  received: Date,
  related: WorkspaceRelatedResource[],
  resource: WorkspaceEventResource,
  workspace: string | null,
}

export class WorkspaceEvent implements IWorkspaceEvent {
  public id: string
  public account: string
  public event: string
  public occurred: Date
  public payload: unknown
  public received: Date
  public related: WorkspaceRelatedResource[]
  public resource: WorkspaceEventResource
  public workspace: string | null

  public constructor(event: IWorkspaceEvent) {
    this.id = event.id
    this.account = event.account
    this.event = event.event
    this.occurred = event.occurred
    this.payload = event.payload
    this.received = event.received
    this.related = event.related
    this.resource = event.resource
    this.workspace = event.workspace
  }

  public getRelatedByRole(role: PrefectResourceRole): WorkspaceRelatedResource | null {
    return this.related.find(value => value['prefect.resource.role'] === role) ?? null
  }

  public get email(): string {
    const actor = this.getRelatedByRole('actor')

    return actor?.['prefect-cloud.email'] ?? ''
  }

  public get actorName(): string | null {
    const actor = this.getRelatedByRole('actor')

    return actor?.['prefect-cloud.name'] ?? null
  }

  public get workspaceHandle(): string {
    const workspace = this.getRelatedByRole('workspace')

    return workspace?.['prefect-cloud.handle'] ?? ''
  }

  public get occurredFormatted(): string {
    return formatDateTimeNumeric(this.occurred)
  }

  public get eventPrefectWithoutPrefix(): string {
    return removePrefectEventLabelPrefix(this.event)
  }

  public get eventLabel(): string {
    const label = this.eventPrefectWithoutPrefix.replaceAll(/[_.-]/g, ' ')

    return capitalize(label.toLocaleLowerCase())
  }

  public get occurredDate(): string {
    return formatDate(this.occurred)
  }

  public get occurredTime(): string {
    return formatTimeNumeric(this.occurred)
  }

  public get resourceId(): string {
    return this.resource['prefect.resource.id']
  }
}

export function isWorkspaceEvent(value: unknown): value is WorkspaceEvent {
  return value instanceof WorkspaceEvent
}