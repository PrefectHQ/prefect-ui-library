<template>
  <ActivityChart
    :history="history"
    :interval-start="intervalStart"
    :interval-end="intervalEnd"
    :interval-seconds="intervalSeconds"
  />
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import ActivityChart from '@/components/ActivityChart.vue'
  import { useWorkspaceApi } from '@/compositions'
  import { Flow } from '@/models'
  import { ceil } from '@/utilities/math'

  const props = defineProps<{
    flow: Flow,
  }>()

  const api = useWorkspaceApi()

  const intervalStart = computed(() => {
    return new Date(props.flow.created)
  })

  const intervalEnd = ref(new Date())

  const intervalSeconds = computed(() => {
    return ceil((intervalEnd.value.getTime() - intervalStart.value.getTime()) / 1000 / 10)
  })

  const historyFilter = computed(() => ({
    'history_end': intervalEnd.value.toISOString(),
    'history_start': intervalStart.value.toISOString(),
    'history_interval_seconds': intervalSeconds.value,
    flows: {
      id: {
        any_: [props.flow.id],
      },
    },
  }))

  const historySubscription = useSubscription(api.flowRuns.getFlowRunsHistory, [historyFilter])
  const history = computed(() => historySubscription.response ?? [])
</script>