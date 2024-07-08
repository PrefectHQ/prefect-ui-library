<template>
  <p-icon-text class="flow-run-list-item-date" icon="CalendarIcon">
    <template v-if="flowRun.startTime">
      <FormattedDate :date="flowRun.startTime" format="numeric">
        <template #default="{ date }">
          {{ date }} {{ flowRun.delta }}
        </template>
      </FormattedDate>
    </template>
    <template v-else-if="flowRun.expectedStartTime">
      <FormattedDate :date="flowRun.expectedStartTime" format="numeric">
        <template #default="{ date }">
          Scheduled for {{ date }} {{ flowRun.delta }}
        </template>
      </FormattedDate>
    </template>
    <template v-else>
      No start time
    </template>
  </p-icon-text>
</template>

<script lang="ts" setup>
  import FormattedDate from '@/components/FormattedDate.vue'
  import { FlowRun } from '@/models/FlowRun'

  defineProps<{
    flowRun: FlowRun,
  }>()
</script>