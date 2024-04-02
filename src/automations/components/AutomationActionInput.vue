<template>
  <template v-if="input">
    <component :is="input.component" v-bind="input.props" class="automation-action-input" />
  </template>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import AutomationActionChangeFlowRunStateInput from '@/automations/components/AutomationActionChangeFlowRunStateInput.vue'
  import AutomationActionPauseAutomationInput from '@/automations/components/AutomationActionPauseAutomationInput.vue'
  import AutomationActionPauseDeploymentInput from '@/automations/components/AutomationActionPauseDeploymentInput.vue'
  import AutomationActionPauseWorkPoolInput from '@/automations/components/AutomationActionPauseWorkPoolInput.vue'
  import AutomationActionPauseWorkQueueInput from '@/automations/components/AutomationActionPauseWorkQueueInput.vue'
  import AutomationActionResumeAutomationInput from '@/automations/components/AutomationActionResumeAutomationInput.vue'
  import AutomationActionResumeDeploymentInput from '@/automations/components/AutomationActionResumeDeploymentInput.vue'
  import AutomationActionResumeWorkPoolInput from '@/automations/components/AutomationActionResumeWorkPoolInput.vue'
  import AutomationActionResumeWorkQueueInput from '@/automations/components/AutomationActionResumeWorkQueueInput.vue'
  import AutomationActionRunDeploymentInput from '@/automations/components/AutomationActionRunDeploymentInput.vue'
  import { AutomationAction } from '@/automations/types'
  import { withProps } from '@/utilities'

  const props = defineProps<{
    action: Partial<AutomationAction>,
  }>()

  const emit = defineEmits<{
    'update:action': [Partial<AutomationAction>],
  }>()

  const input = computed(() => {
    switch (props.action.type) {
      case 'change-flow-run-state':
        return withProps(AutomationActionChangeFlowRunStateInput, {
          action: props.action,
          'onUpdate:action': value => emit('update:action', value),
        })

      case 'run-deployment':
        return withProps(AutomationActionRunDeploymentInput, {
          action: props.action,
          'onUpdate:action': value => emit('update:action', value),
        })

      case 'pause-deployment':
        return withProps(AutomationActionPauseDeploymentInput, {
          action: props.action,
          'onUpdate:action': value => emit('update:action', value),
        })

      case 'resume-deployment':
        return withProps(AutomationActionResumeDeploymentInput, {
          action: props.action,
          'onUpdate:action': value => emit('update:action', value),
        })

      case 'pause-work-pool':
        return withProps(AutomationActionPauseWorkPoolInput, {
          action: props.action,
          'onUpdate:action': value => emit('update:action', value),
        })

      case 'resume-work-pool':
        return withProps(AutomationActionResumeWorkPoolInput, {
          action: props.action,
          'onUpdate:action': value => emit('update:action', value),
        })

      case 'pause-work-queue':
        return withProps(AutomationActionPauseWorkQueueInput, {
          action: props.action,
          'onUpdate:action': value => emit('update:action', value),
        })

      case 'resume-work-queue':
        return withProps(AutomationActionResumeWorkQueueInput, {
          action: props.action,
          'onUpdate:action': value => emit('update:action', value),
        })

      case 'pause-automation':
        return withProps(AutomationActionPauseAutomationInput, {
          action: props.action,
          'onUpdate:action': value => emit('update:action', value),
        })

      case 'resume-automation':
        return withProps(AutomationActionResumeAutomationInput, {
          action: props.action,
          'onUpdate:action': value => emit('update:action', value),
        })

      case 'cancel-flow-run':
      case 'suspend-flow-run':
        return null

      case undefined:
        throw new Error('AutomationActionInput.vue action.type is undefined')

      default:
        const exhaustive: never = props.action
        throw new Error(`AutomationActionInput.vue missing case for action type: ${(exhaustive as Partial<AutomationAction>).type}`)
    }
  })
</script>
