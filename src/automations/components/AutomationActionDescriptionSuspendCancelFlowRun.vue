<template>
  <div class="automation-action-description-suspend-cancel-flow-run">
    <span>{{ suspendOrCancel }} flow run inferred from the triggering event</span>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { AutomationActionCancelFlowRun, AutomationActionSuspendFlowRun } from '@/automations/types/actions'

  const props = defineProps<{
    action: AutomationActionSuspendFlowRun | AutomationActionCancelFlowRun,
  }>()

  const suspendOrCancel = computed(() => props.action.type === 'suspend-flow-run' ? 'Suspend' : 'Cancel')
</script>