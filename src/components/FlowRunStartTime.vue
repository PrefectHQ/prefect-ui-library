<template>
  <p-icon-text class="flow-run-list-item-date" icon="CalendarIcon">
    <template v-if="flowRun.startTime">
      {{ formatDateTimeNumeric(flowRun.startTime) }}
      {{ flowRun.delta }}
    </template>
    <template v-else-if="flowRun.expectedStartTime">
      Scheduled for {{ formatDateTimeNumeric(flowRun.expectedStartTime) }}
      {{ flowRun.delta }}
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