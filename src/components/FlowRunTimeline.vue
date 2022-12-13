<template>
  <FlowRunGraph :flow-run-id="flowRun.id" />
  <FlowRunLogs v-if="flowRun" :flow-run="flowRun" />
</template>

<script lang="ts" setup>
  import {
    FlowRunGraph,
    FlowRunLogs
  } from './'
  import { FlowRun } from '@/models'

  defineProps<{
    flowRun: FlowRun,
  }>()
</script>
