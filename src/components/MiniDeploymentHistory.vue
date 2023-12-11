<template>
  <FlowRunsBarChart
    class="deployment-list__activity-chart"
    mini
    :filter="deploymentRunsFilter"
  />
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { FlowRunsBarChart } from '@/components'
  import { mapper } from '@/services'

  const props = defineProps<{
    deploymentId: string,
    timeSpanInSeconds: number,
  }>()

  const deploymentStats = computed(() => ({
    deploymentId: props.deploymentId,
    timeSpanInSeconds: props.timeSpanInSeconds,
  }))

  const deploymentRunsFilter = computed(() => mapper.map('DeploymentStatsFilter', deploymentStats.value, 'FlowRunsFilter'))
</script>