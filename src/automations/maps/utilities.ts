import { asArray } from '@prefecthq/prefect-design'
import { AutomationTriggerMatch, EventResource, EventResourceLabel, EventResourceRole, EventResourceValue } from '@/automations/types/api/triggers'
import { AutomationTrigger, isAutomationTriggerEvent } from '@/automations/types/triggers'

export function toResourceId(resource: EventResource, values: string[]): string | string[] {
  if (values.length === 0) {
    return `${resource}.*`
  }

  return values.map(flowId => `${resource}.${flowId}`)
}

export function fromResourceId(resource: EventResource, value: EventResourceValue): string[] {
  if (value === undefined) {
    return []
  }

  if (asArray(value).includes(`${resource}.*`)) {
    return []
  }

  return asArray(value).filter(value => value.startsWith(resource)).map(value => {
    const [, id] = value.split(`${resource}.`)

    return id
  })
}

export function fromResourceName(match: AutomationTriggerMatch, role: EventResourceRole): string[] {
  if (role !== match['prefect.resource.role']) {
    return []
  }

  const value = match['prefect.resource.name']

  if (value === undefined) {
    return []
  }

  return asArray(value)
}


export function toStateNameEvents(stateTypes: string[]): string[] {
  if (stateTypes.length === 0) {
    return ['prefect.flow-run.*']
  }

  return stateTypes.map(stateType => `prefect.flow-run.${stateType}`)
}

export function fromStateNameEvents(events: string[]): string[] {
  if (events.includes('prefect.flow-run.*')) {
    return []
  }

  return events.filter(event => event.startsWith('prefect.flow-run')).map(event => {
    const [, name] = event.split('prefect.flow-run.')

    return name
  })
}

export function toMatchRelatedId(role: EventResourceRole, id: string | string[]): AutomationTriggerMatch | undefined {
  const ids = asArray(id)

  if (ids.length === 0) {
    return undefined
  }

  return {
    'prefect.resource.role': role,
    'prefect.resource.id': toResourceId(`prefect.${role}`, ids),
  }
}

export function toMatchRelatedName(role: EventResourceRole, name: string | string[]): AutomationTriggerMatch | undefined {
  const names = asArray(name)

  if (names.length === 0) {
    return undefined
  }

  return {
    'prefect.resource.role': role,
    'prefect.resource.name': names,
  }
}

export function isMatchResource(trigger: AutomationTrigger, predicate: (resourceIds: string[]) => boolean): boolean {
  const prefectResourceIds = getTriggerMatchValue(trigger, 'prefect.resource.id')

  if (prefectResourceIds.length === 0) {
    return false
  }

  return predicate(prefectResourceIds)
}

function getTriggerMatchValue(trigger: AutomationTrigger, key: EventResourceLabel): string[] {
  if (isAutomationTriggerEvent(trigger)) {
    const value = trigger.match[key]

    return value ? asArray(value) : []
  }

  return []
}

export function isForEachResource(trigger: AutomationTrigger, resource: EventResourceLabel): boolean {
  if (isAutomationTriggerEvent(trigger)) {
    return trigger.forEach.every(value => value.startsWith(resource))
  }

  return false
}

export function isExpectResource(trigger: AutomationTrigger, predicate: (resourceIds: string[]) => boolean): boolean {
  if (isAutomationTriggerEvent(trigger)) {
    return predicate(trigger.expect)
  }

  return false
}

export function isAfterResource(trigger: AutomationTrigger, predicate: (resourceIds: string[]) => boolean): boolean {
  if (isAutomationTriggerEvent(trigger)) {
    return predicate(trigger.after)
  }

  return false
}