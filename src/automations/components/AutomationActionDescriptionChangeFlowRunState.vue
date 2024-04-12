<template>
  <div class="automation-action-description-change-flow-run-state">
    <span>Change the flow run's state to <StateBadge :state /> </span>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { AutomationActionChangeFlowRunState } from '@/automations/types/actions'
  import StateBadge from '@/components/StateBadge.vue'
  import { mapper } from '@/services/Mapper'
  import { StateBadgeState } from '@/types/stateBadge'
  import { mapStateTypeOrNameToStateName } from '@/utilities/state'

  const props = defineProps<{
    action: AutomationActionChangeFlowRunState,
  }>()

  const state = computed<StateBadgeState>(() => {
    const test: StateBadgeState = {
      type: mapper.map('ServerStateType', props.action.state, 'StateType'),
      name: mapStateTypeOrNameToStateName(props.action.name ?? props.action.state),
    }

    return test
  })
</script>

<style>

</style>