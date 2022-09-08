<template>
  <template v-if="flowRun.estimatedStartTimeDelta && flowRun.estimatedStartTimeDelta > 1">
    ({{ secondsToApproximateString(flowRun.estimatedStartTimeDelta) }} late)
  </template>
</template>

<script lang="ts" setup>
  import { FlowRun } from '@/models/FlowRun'
  import { secondsToApproximateString } from '@/utilities/seconds'

  defineProps<{
    flowRun: FlowRun,
  }>()
</script>