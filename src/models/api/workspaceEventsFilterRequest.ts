export type EventResourceValue = string | string[] | undefined

/** A list to include events for resources with these IDs */
type id = { id?: string[] }

/** An object record to include events for resources with these labels */
type labels = { labels?: Record<string, EventResourceValue> }

export type WorkspaceEventsFilterRequest = {
  limit?: number,
  filter?: {
    occurred?: { since?: string, until?: string },
    event?: { prefix?: string[], name?: string[], exclude_prefix?: string[], exclude_name?: string[] },
    any_resource?: id & labels & { id_prefix?: string[] },
    resource?: id & labels & { id_prefix?: string[], distinct?: boolean },
    related?: id & labels & { role?: string[], resources_in_roles?: unknown[] },
    scope?: { account?: string, workspace?: string[] },
    id?: id,
  },
}