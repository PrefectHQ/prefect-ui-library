<template>
  <MiniRadarView
    class="radar-small"
    :radar="radar"
    hide-viewport
    disable-interactions
    :color-accessor="getStateColor"
  />
</template>

<script lang="ts" setup>
  import { MiniRadarView, Radar, Item } from '@prefecthq/radar'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { reactive, computed } from 'vue'
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

  const _radar = reactive(new Radar().id('id').dependencies('upstreamDependencies'))

  const radar = computed<Radar>(() => {
    return _radar.items(graph.value)
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