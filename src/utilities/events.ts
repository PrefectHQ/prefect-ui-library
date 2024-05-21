import { PrefectResourceRole, isPrefectResourceRole, prefectEventPrefixes } from '@/models/workspaceEvent'

export function removePrefectEventLabelPrefix(value: string): string {
  if (value.startsWith('prefect.') || value.startsWith('prefect-cloud.')) {
    return value.split('.').slice(1).join('.')
  }

  return value
}

export function getPrefectResourceRole(value: string): PrefectResourceRole | null {
  const roleRegex = new RegExp(`^(${prefectEventPrefixes.join('|')})\\.`, 'g')
  const [, prefix = ''] = roleRegex.exec(value) ?? []
  const role = prefix.split('.').at(-1)

  if (isPrefectResourceRole(role)) {
    return role
  }

  return null
}

type GetResourceIdParts = {
  id: string | null,
  type: string | null,
  role: PrefectResourceRole | null,
}

export function getResourceIdParts(resourceId: string): GetResourceIdParts {
  // not all resource ids will be uuids (i.e. artifact collection keys). fallback to last part of string (`prefect.tag.my-tag`)
  const id = parseGuid(resourceId) ?? resourceId.split('.').at(-1) ?? null
  const type = resourceId.split('.').at(-2) ?? null
  const role = getPrefectResourceRole(resourceId)

  return {
    id,
    type,
    role,
  }
}

export function getEventWithPrefixes(event: string): string[] {
  const prefixes = []
  const parts = event.split('.')

  for (let index = 1; index < parts.length; index++) {
    const prefix = parts.slice(0, index).join('.')

    prefixes.push(`${prefix}.*`)
  }

  return [...prefixes, event]
}

function parseGuid(value: string): string | null {
  const guidRegex = /([a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12})/i
  const [match = null] = guidRegex.exec(value) ?? []

  return match
}