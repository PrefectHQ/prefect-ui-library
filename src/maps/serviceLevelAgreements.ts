import { ServiceLevelAgreementResponse } from '@/models/api/ServiceLevelAgreementResponse'
import { ServiceLevelAgreement } from '@/models/ServiceLevelAgreement'
import { MapFunction } from '@/services/Mapper'

export const mapServiceLevelAgreementResponseToServiceLevelAgreement: MapFunction<ServiceLevelAgreementResponse, ServiceLevelAgreement> = function(source) {
  return new ServiceLevelAgreement({
    id: source.id,
    name: source.name,
    description: source.description,
    enabled: source.enabled,
    trigger: this.map('AutomationTriggerResponse', source.trigger, 'AutomationTrigger'),
    type: source.type,
    severity: source.severity,
    created: this.map('string', source.created, 'Date'),
    updated: this.map('string', source.updated, 'Date'),
    account: source.account,
    workspace: source.workspace,
    actor: {
      actorId: source.actor.actor_id,
      handle: source.actor.handle,
      userId: source.actor.user_id,
      botId: source.actor.bot_id,
    },
  })
}

