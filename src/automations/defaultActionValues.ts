import { AutomationAction, AutomationActionCallWebhook, AutomationActionSendNotification, AutomationActionType } from '@/automations/types/actions'
import { AutomationTriggerTemplate } from '@/automations/types/triggerTemplates'

export function getDefaultValueForAction(type: AutomationActionType, template: AutomationTriggerTemplate): Partial<AutomationAction> {
  switch (type) {
    case 'send-notification':
      return getDefaultValueForSendNotification(template)
    case 'call-webhook':
      return getDefaultValueForCallWebhook(template)
    case 'cancel-flow-run':
    case 'suspend-flow-run':
    case 'resume-flow-run':
    case 'change-flow-run-state':
    case 'run-deployment':
    case 'pause-deployment':
    case 'resume-deployment':
    case 'pause-work-queue':
    case 'resume-work-queue':
    case 'pause-work-pool':
    case 'resume-work-pool':
    case 'pause-automation':
    case 'resume-automation':
    case 'do-nothing':
      return { type }
    default:
      throw new Error(`getDefaultValueForAction does not have case for action type: ${type satisfies never}`)
  }
}

export function getDefaultValueForSendNotification(template: AutomationTriggerTemplate): Partial<AutomationActionSendNotification> {
  return {
    type: 'send-notification',
    subject: getDefaultNotificationSubject(template),
    body: getDefaultNotificationBody(template),
  }
}

export function getDefaultValueForCallWebhook(template: AutomationTriggerTemplate): Partial<AutomationActionCallWebhook> {
  return {
    type: 'call-webhook',
    payload: getDefaultWebhookPayload(template),
  }
}

const NOTIFICATION_BODY_DEPLOYMENT_STATUS = `
Name: {{ flow.name }}/{{ deployment.name }}
Status: {{ deployment.status }}
URL: {{ deployment|ui_url }}
`

const NOTIFICATION_BODY_WORK_POOL_STATUS = `
Name: {{ work_pool.name }}
Status: {{ work_pool.status }}
URL: {{ work_pool|ui_url }}
`.trim()

const NOTIFICATION_BODY_WORK_QUEUE_STATUS = `
Name: {{ work_queue.name }}
Status: {{ work_queue.status }}
URL: {{ work_queue|ui_url }}
`.trim()

const NOTIFICATION_BODY_WORK_FLOW_RUN_STATE = `
Flow run {{ flow.name }}/{{ flow_run.name }} observed in state \`{{ flow_run.state.name }}\` at {{ flow_run.state.timestamp }}.
Flow ID: {{ flow_run.flow_id }}
Flow run ID: {{ flow_run.id }}
Flow run URL: {{ flow_run|ui_url }}
State message: {{ flow_run.state.message }}
`.trim()

const NOTIFICATION_BODY_CUSTOM = `
Automation: {{ automation.name }}
Description: {{ automation.description }}

Event: {{ event.id }}
Resource:
{% for label, value in event.resource %}
{{ label }}: {{ value }}
{% endfor %}
Related Resources:
{% for related in event.related %}
    Role: {{ related.role }}
    {% for label, value in related %}
    {{ label }}: {{ value }}
    {% endfor %}
{% endfor %}
`.trim()

const WEBHOOK_PAYLOAD_DEPLOYMENT_STATUS = `{
  "flow_name": "{{ flow.name }}",
  "deployment_name": "{{ deployment.name }}",
  "deployment_status": "{{ deployment.status }}",
  "deployment_url": "{{ deployment|ui_url }}"
}`.trim()

const WEBHOOK_PAYLOAD_WORK_POOL_STATUS = `{
  "work_pool_name": "{{ work_pool.name }}",
  "work_pool_status": "{{ work_pool.status }}",
  "work_pool_url": "{{ work_pool|ui_url }}"
}`.trim()

const WEBHOOK_PAYLOAD_WORK_QUEUE_STATUS = `{
  "work_queue_name": "{{ work_queue.name }}",
  "work_queue_status": "{{ work_queue.status }}",
  "work_queue_url": "{{ work_queue|ui_url }}"
}`.trim()

const WEBHOOK_PAYLOAD_FLOW_RUN_STATE = `{
  "flow_name": "{{ flow.name }}",
  "flow_run_name": "{{ flow_run.name }}",
  "flow_run_id": "{{ flow_run.id }}",
  "flow_run_state_type": "{{ flow_run.state.type }}",
  "flow_run_state_name": "{{ flow_run.state.name }}",
  "flow_run_state_timestamp": "{{ flow_run.state.timestamp }}",
  "flow_run_state_message": "{{ flow_run.state.message }}",
  "flow_run_url": "{{ flow_run|ui_url }}"
}`.trim()

const WEBHOOK_PAYLOAD_CUSTOM = `{
  "automation_name": "{{ automation.name }}",
  "automation_description": "{{ automation.description }}",
  "event_id": "{{ event.id }}",
  "event_resource": {{ event.resource|tojson }},
  "event_related": {{ event.related|tojson }}
}`.trim()

export function getDefaultWebhookPayload(template: AutomationTriggerTemplate): string {
  switch (template) {
    case 'deployment-status':
      return WEBHOOK_PAYLOAD_DEPLOYMENT_STATUS
    case 'flow-run-state':
      return WEBHOOK_PAYLOAD_FLOW_RUN_STATE
    case 'work-pool-status':
      return WEBHOOK_PAYLOAD_WORK_POOL_STATUS
    case 'work-queue-status':
      return WEBHOOK_PAYLOAD_WORK_QUEUE_STATUS
    case 'custom':
      return WEBHOOK_PAYLOAD_CUSTOM
    default:
      const exhaustiveCheck: never = template
      throw new Error(`Default webhook payload missing for template type: ${exhaustiveCheck}`)
  }
}

export function getDefaultNotificationBody(template: AutomationTriggerTemplate): string {
  switch (template) {
    case 'deployment-status':
      return NOTIFICATION_BODY_DEPLOYMENT_STATUS
    case 'flow-run-state':
      return NOTIFICATION_BODY_WORK_FLOW_RUN_STATE
    case 'work-pool-status':
      return NOTIFICATION_BODY_WORK_POOL_STATUS
    case 'work-queue-status':
      return NOTIFICATION_BODY_WORK_QUEUE_STATUS
    case 'custom':
      return NOTIFICATION_BODY_CUSTOM
    default:
      const exhaustiveCheck: never = template
      throw new Error(`Default notification body missing for template type: ${exhaustiveCheck}`)
  }
}

export function getDefaultNotificationSubject(template: AutomationTriggerTemplate): string {
  switch (template) {
    case 'deployment-status':
      return 'Prefect deployment \'{{ flow.name }}/{{ deployment.name }}\' has entered status \'{{ deployment.status }}\''
    case 'flow-run-state':
      return 'Prefect flow run notification'
    case 'work-pool-status':
      return 'Prefect work pool \'{{ work_pool.name }}\' has entered status \'{{ work_pool.status }}\''
    case 'work-queue-status':
      return 'Prefect work queue \'{{ work_queue.name }}\' has entered status \'{{ work_queue.status }}\''
    case 'custom':
      return 'A Prefect automation \'{{ automation.name }}\' was triggered'
    default:
      const exchaustiveCheck: never = template
      throw new Error(`Default notification subject missing for template type: ${exchaustiveCheck}`)
  }
}
