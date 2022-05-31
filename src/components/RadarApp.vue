<template>
  <RadarView
    :id="flowRunId"
    class="radar-app"
    :items="graph"
    :edge-color-accessor="getStateColor"
    id-accessor="id"
    upstream-accessor="upstreamDependencies"
  />
</template>

<script lang="ts" setup>
  import { RadarView, Item } from '@prefecthq/radar'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { flowRunsApiKey } from '@/services'
  import { inject } from '@/utilities/inject'

  const computedStyle = getComputedStyle(document.body)

  const props = defineProps<{
    flowRunId: string,
  }>()

  const flowRunsApi = inject(flowRunsApiKey)
  const subscription = useSubscription(flowRunsApi.getFlowRunsGraph, [props.flowRunId])

  const graph = computed(() => {
    return subscription.response ?? []
  })

  const getStateColor = (item: Item): string => {
    const color = computedStyle.getPropertyValue(`--state-${item.state?.type}-500`)
    return color
  }
</script>

<style>
.radar-small {
  @apply
  w-full
  h-full
}
</style>