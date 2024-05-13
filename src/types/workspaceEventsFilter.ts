import { EventResourceValue } from '@/automations/types/api/triggers'
import { createTuple } from '@/utilities/tuples'

/** A list to include events for resources with these IDs */
type id = { id?: string[] }

/** An object record to include events for resources with these labels */
type labels = { labels?: Record<string, EventResourceValue > }

export type EventNameFilter = { prefix?: string[], name?: string[], excludePrefix?: string[], excludeName?: string[] }

export type EventAnyResourceFilter = id & labels & { idPrefix?: string[] }

export type EventResourceFilter = EventAnyResourceFilter & { distinct?: boolean }

export type EventRelatedFilter = id & labels & { role?: string[], resourcesInRoles?: unknown[] }

export const { values: EventsFilterOrderOptions, isValue: isEventsFilterOrderOption } = createTuple(['ASC', 'DESC'])
export type EventsFilterOrderOption = typeof EventsFilterOrderOptions[number]

export type WorkspaceEventsFilter = {
  limit?: number,
  occurred: { since: Date, until: Date },
  event?: EventNameFilter,
  anyResource?: EventAnyResourceFilter,
  resource?: EventResourceFilter,
  related?: EventRelatedFilter,
  scope?: { account?: string, workspace?: string[] },
  id?: id,
  order?: EventsFilterOrderOption,
}

/**
 * Caution: Do not use unless you need to construct a partial filter before adding occurred.
 * All requests made should include occurred and the api endpoints guard against this by using
 * the EventsFilter type which requires both occurred.since and occurred.until.
 */
export type PartialWorkspaceEventsFilter = Omit<WorkspaceEventsFilter, 'occurred'> & {
  occurred?: { since?: Date, until?: Date },
}