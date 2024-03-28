<template>
  <template v-if="input">
    <component :is="input.component" v-bind="input.props" class="automation-action-input" />
  </template>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import AutomationActionPauseDeploymentInput from '@/automations/components/AutomationActionPauseDeploymentInput.vue'
  import AutomationActionResumeDeploymentInput from '@/automations/components/AutomationActionResumeDeploymentInput.vue'
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

      case 'cancel-flow-run':
        return null

      case undefined:
        throw new Error('AutomationActionInput.vue action.type is undefined')

      default:
        const exhaustive: never = props.action
        throw new Error(`AutomationActionInput.vue missing case for action type: ${(exhaustive as Partial<AutomationAction>).type}`)
    }
  })
</script>
