<template>
  <div class="automation-action-description-default">
    {{ automationActionTypeLabels[action.type] }}
  </div>
</template>

<script lang="ts" setup>
  import { AutomationAction, automationActionTypeLabels } from '@/automations/types/actions'

  defineProps<{
    action: AutomationAction,
  }>()
</script>