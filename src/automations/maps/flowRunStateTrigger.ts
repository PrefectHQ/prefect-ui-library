import { fromResourceId, fromStateNameEvents, toMatchRelatedId, toStateNameEvents } from '@/automations/maps/utilities'
import { AutomationTriggerEvent } from '@/automations/types'
import { FlowRunStateTrigger } from '@/automations/types/flowRunStateTrigger'
import { MapFunction } from '@/services'

export const mapFlowRunStateTriggerToAutomationTrigger: MapFunction<FlowRunStateTrigger, AutomationTriggerEvent> = function(source) {
  if (source.posture === 'Reactive') {
    return mapReactiveFlowRunStateTriggerToAutomationTrigger(source)
  }

  return mapProactiveFlowRunStateTriggerToAutomationTrigger(source)
}

export const mapAutomationTriggerToFlowRunStateTrigger: MapFunction<AutomationTriggerEvent, FlowRunStateTrigger> = function(source) {
  if (source.posture === 'Reactive') {
    return mapReactiveAutomationTriggerToFlowRunStateTrigger(source)
  }

  return mapProactiveAutomationTriggerToFlowRunStateTrigger(source)
}

function mapReactiveAutomationTriggerToFlowRunStateTrigger(trigger: AutomationTriggerEvent): FlowRunStateTrigger {
  return {
    flowIds: fromResourceId('prefect.flow', trigger.matchRelated['prefect.resource.id']),
    tags: fromResourceId('prefect.tag', trigger.matchRelated['prefect.resource.id']),
    posture: 'Reactive',
    states: fromStateNameEvents(trigger.expect),
    time: trigger.within,
  }
}

function mapProactiveAutomationTriggerToFlowRunStateTrigger(trigger: AutomationTriggerEvent): FlowRunStateTrigger {
  return {
    flowIds: fromResourceId('prefect.flow', trigger.matchRelated['prefect.resource.id']),
    tags: fromResourceId('prefect.tag', trigger.matchRelated['prefect.resource.id']),
    posture: 'Proactive',
    states: fromStateNameEvents(trigger.after),
    time: trigger.within,
  }
}

function mapReactiveFlowRunStateTriggerToAutomationTrigger(source: FlowRunStateTrigger): AutomationTriggerEvent {
  return new AutomationTriggerEvent({
    posture: 'Reactive',
    match: {
      'prefect.resource.id': 'prefect.flow-run.*',
    },
    matchRelated: {
      ...toMatchRelatedId('flow', source.flowIds),
      ...toMatchRelatedId('tag', source.tags),
    },
    forEach: ['prefect.resource.id'],
    expect: toStateNameEvents(source.states),
  })
}

function mapProactiveFlowRunStateTriggerToAutomationTrigger(source: FlowRunStateTrigger): AutomationTriggerEvent {
  return new AutomationTriggerEvent({
    posture: 'Proactive',
    match: {
      'prefect.resource.id': 'prefect.flow-run.*',
    },
    matchRelated: {
      ...toMatchRelatedId('flow', source.flowIds),
      ...toMatchRelatedId('tag', source.tags),
    },
    forEach: ['prefect.resource.id'],
    after: toStateNameEvents(source.states),
    expect: toStateNameEvents([]),
    within: source.time,
  })
}

