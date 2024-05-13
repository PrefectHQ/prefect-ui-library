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