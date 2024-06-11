<template>
  <component :is="description.component" v-bind="description.props" class="automation-trigger-description" />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import AutomationTriggerDescriptionCustom from '@/automations/components/AutomationTriggerDescriptionCustom.vue'
  import AutomationTriggerDescriptionDeploymentStatus from '@/automations/components/AutomationTriggerDescriptionDeploymentStatus.vue'
  import AutomationTriggerDescriptionFlowRunState from '@/automations/components/AutomationTriggerDescriptionFlowRunState.vue'
  import AutomationTriggerDescriptionWorkPoolStatus from '@/automations/components/AutomationTriggerDescriptionWorkPoolStatus.vue'
  import AutomationTriggerDescriptionWorkQueueStatus from '@/automations/components/AutomationTriggerDescriptionWorkQueueStatus.vue'
  import { getAutomationTriggerTemplate } from '@/automations/types'
  import { AutomationTrigger } from '@/automations/types/triggers'
  import { mapper } from '@/services'
  import { withProps } from '@/utilities'

  const props = defineProps<{
    trigger: AutomationTrigger,
  }>()

  const description = computed(() => {
    const template = getAutomationTriggerTemplate(props.trigger)

    switch (template) {
      case 'deployment-status':
        return withProps(AutomationTriggerDescriptionDeploymentStatus, {
          trigger: mapper.map('AutomationTrigger', props.trigger, 'DeploymentStatusTrigger'),
        })

      case 'flow-run-state':
        return withProps(AutomationTriggerDescriptionFlowRunState, {
          trigger: mapper.map('AutomationTrigger', props.trigger, 'FlowRunStateTrigger'),
        })

      case 'work-pool-status':
        return withProps(AutomationTriggerDescriptionWorkPoolStatus, {
          trigger: mapper.map('AutomationTrigger', props.trigger, 'WorkPoolStatusTrigger'),
        })

      case 'work-queue-status':
        return withProps(AutomationTriggerDescriptionWorkQueueStatus, {
          trigger: mapper.map('AutomationTrigger', props.trigger, 'WorkQueueStatusTrigger'),
        })

      case 'custom':
        return withProps(AutomationTriggerDescriptionCustom, {})

      default:
        const exhaustive: never = template
        throw new Error(`AutomationTriggerDescription missing case for trigger template: ${exhaustive}`)
    }
  })
</script>

<style>
.automation-trigger-description { @apply
  text-sm
}
</style>