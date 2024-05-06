<template>
  <component :is="input.component" v-bind="input.props" class="automation-trigger-event-input" />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import AutomationTriggerCustomEventInput from '@/automations/components/AutomationTriggerCustomEventInput.vue'
  import AutomationTriggerDeploymentStatusInput from '@/automations/components/AutomationTriggerDeploymentStatusInput.vue'
  import AutomationTriggerFlowRunStateInput from '@/automations/components/AutomationTriggerFlowRunStateInput.vue'
  import AutomationTriggerWorkPoolStatusInput from '@/automations/components/AutomationTriggerWorkPoolStatusInput.vue'
  import AutomationTriggerWorkQueueStatusInput from '@/automations/components/AutomationTriggerWorkQueueStatusInput.vue'
  import { AutomationTriggerEvent } from '@/automations/types/automationTriggerEvent'
  import { AutomationTriggerEventTemplate } from '@/automations/types/triggerTemplates'
  import { withProps } from '@/utilities'

  const trigger = defineModel<AutomationTriggerEvent>('trigger', { required: true })

  const { template } = defineProps<{
    template: AutomationTriggerEventTemplate,
  }>()

  const input = computed(() => {
    switch (template) {
      case 'deployment-status':
        return withProps(AutomationTriggerDeploymentStatusInput, {
          trigger: trigger.value,
          'onUpdate:trigger': update,
        })

      case 'flow-run-state':
        return withProps(AutomationTriggerFlowRunStateInput, {
          trigger: trigger.value,
          'onUpdate:trigger': update,
        })

      case 'work-pool-status':
        return withProps(AutomationTriggerWorkPoolStatusInput, {
          trigger: trigger.value,
          'onUpdate:trigger': update,
        })

      case 'work-queue-status':
        return withProps(AutomationTriggerWorkQueueStatusInput, {
          trigger: trigger.value,
          'onUpdate:trigger': update,
        })

      case 'custom':
        return withProps(AutomationTriggerCustomEventInput, {
          trigger: trigger.value,
          'onUpdate:modelValue': update,
        })

      default:
        throw new Error(`AutomationTriggerEventInput does not support template: ${template satisfies never}`)
    }
  })

  function update(value: AutomationTriggerEvent): void {
    trigger.value = value
  }
</script>