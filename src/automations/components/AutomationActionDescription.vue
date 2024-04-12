<template>
  <component :is="description.component" v-bind="description.props" class="automation-action-description" />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import AutomationActionDescriptionChangeFlowRunState from '@/automations/components/AutomationActionDescriptionChangeFlowRunState.vue'
  import AutomationActionDescriptionDefault from '@/automations/components/AutomationActionDescriptionDefault.vue'
  import AutomationActionDescriptionPauseResumeDeployment from '@/automations/components/AutomationActionDescriptionPauseResumeDeployment.vue'
  import AutomationActionDescriptionPauseResumeWorkPool from '@/automations/components/AutomationActionDescriptionPauseResumeWorkPool.vue'
  import AutomationActionDescriptionPauseResumeWorkQueue from '@/automations/components/AutomationActionDescriptionPauseResumeWorkQueue.vue'
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
      case 'suspend-flow-run':
      case 'cancel-flow-run':
      case 'run-deployment':
      case 'pause-automation':
      case 'resume-automation':
      case 'send-notification':
        return withProps(AutomationActionDescriptionDefault, {
          action: props.action,
        })
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