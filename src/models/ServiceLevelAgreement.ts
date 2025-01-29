import { AutomationTrigger } from '@/automations'

export type ServiceLevelAgreementSeverity = 'minor' | 'low' | 'moderate' | 'high' | 'critical'

export enum ServiceLevelAgreementType {
  FrequencySla = 'Frequency',
  FreshnessSla = 'Freshness',
  LatenessSla = 'Lateness',
  TimeToCompletionSla = 'Time to Completion'
}

export interface IServiceLevelAgreement {
  id: string,
  name: string,
  description: string,
  enabled: boolean,
  trigger: AutomationTrigger,
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
  public readonly trigger: AutomationTrigger
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
}
