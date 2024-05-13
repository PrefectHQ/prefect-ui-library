import { AutomationTriggerEvent } from '@/automations/types/automationTriggerEvent'
import { AutomationTrigger } from '@/automations/types/triggers'
import { FlowResponse } from '@/models/api/FlowResponse'
import { Flow } from '@/models/Flow'
import { MapFunction } from '@/services/Mapper'

export const mapFlowResponseToFlow: MapFunction<FlowResponse, Flow> = function(source) {
  return new Flow({
    id: source.id,
    name: source.name,
    description: source.description,
    created: this.map('string', source.created, 'Date'),
    updated: this.map('string', source.updated, 'Date'),
  })
}

export const mapFlowToFlowResponse: MapFunction<Flow, FlowResponse> = function(source) {
  return {
    id: source.id,
    name: source.name,
    description: source.description,
    created: this.map('Date', source.created, 'string'),
    updated: this.map('Date', source.updated, 'string'),
  }
}

export const mapFlowToAutomationTrigger: MapFunction<Flow, AutomationTrigger> = function(flow) {
  return new AutomationTriggerEvent({
    'posture': 'Reactive',
    'match': {
      'prefect.resource.id': 'prefect.flow-run.*',
    },
    'matchRelated': {
      'prefect.resource.role': 'flow',
      'prefect.resource.id': `prefect.flow.${flow.id}`,
    },
    'forEach': ['prefect.resource.id'],
  })
}
