<template>
  <template v-if="description">
    <component :is="description.component" v-bind="description.props" class="automation-action-description" />
  </template>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import AutomationActionDescriptionChangeFlowRunState from '@/automations/components/AutomationActionDescriptionChangeFlowRunState.vue'
  import AutomationActionDescriptionPauseResumeAutomation from '@/automations/components/AutomationActionDescriptionPauseResumeAutomation.vue'
  import AutomationActionDescriptionPauseResumeDeployment from '@/automations/components/AutomationActionDescriptionPauseResumeDeployment.vue'
  import AutomationActionDescriptionPauseResumeWorkPool from '@/automations/components/AutomationActionDescriptionPauseResumeWorkPool.vue'
  import AutomationActionDescriptionPauseResumeWorkQueue from '@/automations/components/AutomationActionDescriptionPauseResumeWorkQueue.vue'
  import AutomationActionDescriptionResumeFlowRun from '@/automations/components/AutomationActionDescriptionResumeFlowRun.vue'
  import AutomationActionDescriptionRunDeployment from '@/automations/components/AutomationActionDescriptionRunDeployment.vue'
  import AutomationActionSendNotification from '@/automations/components/AutomationActionDescriptionSendNotification.vue'
  import AutomationActionDescriptionSuspendCancelFlowRun from '@/automations/components/AutomationActionDescriptionSuspendCancelFlowRun.vue'
  import { AutomationAction } from '@/automations/types/actions'
  import { withProps } from '@/utilities'

  const props = defineProps<{
    action: AutomationAction,
  }>()

  const description = computed(() => {
    switch (props.action.type) {
      case 'pause-deployment':
      case 'resume-deployment':
        return withProps(AutomationActionDescriptionPauseResumeDeployment, {
          action: props.action,
        })
      case 'pause-work-queue':
      case 'resume-work-queue':
        return withProps(AutomationActionDescriptionPauseResumeWorkQueue, {
          action: props.action,
        })
      case 'change-flow-run-state':
        return withProps(AutomationActionDescriptionChangeFlowRunState, {
          action: props.action,
        })
      case 'pause-work-pool':
      case 'resume-work-pool':
        return withProps(AutomationActionDescriptionPauseResumeWorkPool, {
          action: props.action,
        })
      case 'pause-automation':
      case 'resume-automation':
        return withProps(AutomationActionDescriptionPauseResumeAutomation, {
          action: props.action,
        })
      case 'suspend-flow-run':
      case 'cancel-flow-run':
        return withProps(AutomationActionDescriptionSuspendCancelFlowRun, {
          action: props.action,
        })
      case 'resume-flow-run':
        return withProps(AutomationActionDescriptionResumeFlowRun, {
          action: props.action,
        })
      case 'run-deployment':
        return withProps(AutomationActionDescriptionRunDeployment, {
          action: props.action,
        })
      case 'send-notification':
        return withProps(AutomationActionSendNotification, {
          action: props.action,
        })

      case 'do-nothing':
        return null

      default:
        const exhaustive: never = props.action
        throw new Error(`AutomationActionDescription has no case for type: ${(exhaustive as AutomationAction).type}`)
    }
  })
</script>

<style>
.automation-action-description { @apply
  text-sm
}
</style>
