import { AutomationTriggerEvent } from '@/automations'
import { createTuple, secondsToString } from '@/utilities'

export type ServiceLevelAgreementSeverity = 'minor' | 'low' | 'moderate' | 'high' | 'critical'

export const { values: ServiceLevelAgreementType, isValue: isServiceLevelAgreementType } = createTuple(['FrequencySla', 'LatenessSla', 'TimeToCompletionSla'])

export type ServiceLevelAgreementType = typeof ServiceLevelAgreementType[number]

export type ServiceLevelAgreementDisplayType = 'Frequency' | 'Lateness' | 'Time to Completion'

export interface IServiceLevelAgreement {
  id: string,
  name: string,
  description: string,
  enabled: boolean,
  trigger: AutomationTriggerEvent,
  severity: ServiceLevelAgreementSeverity,
  type: ServiceLevelAgreementType,
  created: Date,
  updated: Date,
  account: string,
  workspace: string,
  actor: {
    actorId: string,
    handle: string,
    userId: string | null,
    botId: string | null,
  },
}

export class ServiceLevelAgreement implements IServiceLevelAgreement {
  public readonly id: string
  public readonly name: string
  public readonly description: string
  public readonly enabled: boolean
  public readonly trigger: AutomationTriggerEvent
  public readonly severity: ServiceLevelAgreementSeverity
  public readonly type: ServiceLevelAgreementType
  public readonly created: Date
  public readonly updated: Date
  public readonly account: string
  public readonly workspace: string
  public readonly actor: {
    actorId: string,
    handle: string,
    userId: string | null,
    botId: string | null,
  }

  public constructor(serviceLevelAgreement: IServiceLevelAgreement) {
    this.id = serviceLevelAgreement.id
    this.name = serviceLevelAgreement.name
    this.description = serviceLevelAgreement.description
    this.enabled = serviceLevelAgreement.enabled
    this.trigger = serviceLevelAgreement.trigger
    this.created = serviceLevelAgreement.created
    this.updated = serviceLevelAgreement.updated
    this.account = serviceLevelAgreement.account
    this.workspace = serviceLevelAgreement.workspace
    this.actor = serviceLevelAgreement.actor
    this.severity = serviceLevelAgreement.severity
    this.type = serviceLevelAgreement.type
  }

  public durationInSeconds(): number {
    return this.trigger.within
  }

  public getSlaDefinitionKeyValuePairs(): { key: string, value: unknown }[] {
    switch (this.type) {
      case 'FrequencySla':
        return [{ key: 'Stale After', value: secondsToString(this.trigger.within) }]
      case 'LatenessSla':
        return [{ key: 'Within', value: secondsToString(this.trigger.within) }]
      case 'TimeToCompletionSla':
        return [{ key: 'Duration', value: secondsToString(this.trigger.within) }]
      default:
        return []
    }
  }

  public getDisplaySlaType(): ServiceLevelAgreementDisplayType {
    switch (this.type) {
      case 'FrequencySla':
        return 'Frequency'
      case 'LatenessSla':
        return 'Lateness'
      case 'TimeToCompletionSla':
        return 'Time to Completion'
      default:
        return 'Time to Completion'
    }
  }
}
