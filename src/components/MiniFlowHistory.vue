<template>
  <FlowRunsBarChart
    class="flow-list__activity-chart"
    mini
    :filter="flowRunsFilter"
  />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { FlowRunsBarChart } from '@/components'
  import { mapper } from '@/services'
  import { FlowStatsFilter } from '@/types/flow'

  const props = defineProps<{
    flowId: string,
    timeSpanInSeconds: number,
  }>()

  const flowStats = computed<FlowStatsFilter>(() => ({
    flowId: props.flowId,
    range: { type: 'span', seconds: props.timeSpanInSeconds },
  }))

  const flowRunsFilter = computed(() => mapper.map('FlowStatsFilter', flowStats.value, 'FlowRunsFilter'))
</script>