<template>
  <p-icon-text class="flow-run-date-icon-text" icon="CalendarIcon">
    <template v-if="flowRun.startTime">
      {{ formatDateTimeNumeric(flowRun.startTime) }}
    </template>
    <template v-else-if="flowRun.expectedStartTime">
      Scheduled for <span class="flow-run-date-icon-text__expected">{{ formatDateTimeNumeric(flowRun.expectedStartTime) }}</span>
    </template>
    <template v-else>
      No start time
    </template>
  </p-icon-text>
</template>

<script lang="ts" setup>
  import { FlowRun } from '@/models/FlowRun'
  import { formatDateTimeNumeric } from '@/utilities/dates'

  defineProps<{
    flowRun: FlowRun,
  }>()
</script>

<style>
.flow-run-date-icon-text__expected { @apply
  font-bold
}
</style>