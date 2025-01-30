import { AutomationActionResponse } from '@/automations/types/api/actions'
import { AutomationTriggerResponse } from '@/automations/types/api/triggers'
import { ServiceLevelAgreementSeverity, ServiceLevelAgreementType } from '@/models/ServiceLevelAgreement'


export type ServiceLevelAgreementResponse = {
  name: string,
  description: string,
  enabled: boolean,
  trigger: AutomationTriggerResponse,
  actions_on_resolve: AutomationActionResponse[],
  type: ServiceLevelAgreementType,
  severity: ServiceLevelAgreementSeverity,
  id: string,
  created: string,
  updated: string,
  account: string,
  workspace: string,
  actor: {
    actor_id: string,
    handle: string,
    user_id: string | null,
    bot_id: string | null,
  },
}