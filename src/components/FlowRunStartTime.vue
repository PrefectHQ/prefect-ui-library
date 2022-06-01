<template>
  <p-icon-text class="flow-run-list-item-date" icon="CalendarIcon">
    <template v-if="flowRun.startTime">
      {{ formatDateTimeNumeric(flowRun.startTime) }}
    </template>
    <template v-else-if="flowRun.expectedStartTime">
      Scheduled for <span class="flow-run-list-item-date__expected">{{ formatDateTimeNumeric(flowRun.expectedStartTime) }}</span>
    </template>
    <template v-else>
      No start time
    </template>
  </p-icon-text>
</template>

<script lang="ts" setup>
  import { formatDateTimeNumeric } from '@prefecthq/prefect-design'
  import { FlowRun } from '@/models/FlowRun'

  defineProps<{
    flowRun: FlowRun,
  }>()
</script>

<style>
.flow-run-list-item-date__expected { @apply
  font-bold
}
</style>