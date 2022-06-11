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
  import { addMonths } from 'date-fns'
  import { computed, ref } from 'vue'
  import ActivityChart from './ActivityChart.vue'
  import { Flow } from '@/models'
  import { flowRunsApiKey } from '@/services/FlowRunsApi'
  import { FlowRunsHistoryFilter } from '@/types/UnionFilters'
  import { inject } from '@/utilities/inject'
  import { ceil } from '@/utilities/math'

  const flowRunsApi = inject(flowRunsApiKey)

  const props = defineProps<{
    flow?: Flow,
  }>()

  const intervalStart = computed(() => {
    return new Date(props.flow?.created ?? addMonths(new Date(), -1))
  })

  const intervalEnd = ref(new Date())

  const intervalSeconds = computed(() => {
    return ceil((intervalEnd.value.getTime() - intervalStart.value.getTime()) / 1000 / 10)
  })

  const historyFilter = computed(() => {
    const value: FlowRunsHistoryFilter = {
      history_end: intervalEnd.value.toISOString(),
      history_start: intervalStart.value.toISOString(),
      history_interval_seconds: intervalSeconds.value,
    }

    if (props.flow) {
      value.flows = {
        id: {
          any_: [props.flow.id],
        },
      }
    }

    return value
  })

  const historySubscription = useSubscription(flowRunsApi.getFlowRunsHistory, [historyFilter])
  const history = computed(() => historySubscription.response ?? [])
</script>