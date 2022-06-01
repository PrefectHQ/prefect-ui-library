<template>
  <div>
    <DivergingBarChart
      class="flow-activity-chart"
      :items="items"
      :interval-start="intervalStart"
      :interval-end="intervalEnd"
      :interval-seconds="intervalSeconds"
      :positive-sentiment-keys="positiveSentimentKeys"
      :negative-sentiment-keys="negativeSentimentKeys"
      static-median
      :chart-padding="{ top: 4, bottom: 24, middle: 8 }"
    >
      <template #default="{ key }">
        <div class="flow-activity-chart__bar" :class="getStateColor(key)" />
      </template>

      <template #median>
        <div class="flow-activity-chart__median" />
      </template>

      <template #empty>
        <div class="flow-activity-chart__empty" />
      </template>
    </DivergingBarChart>
  </div>
</template>

<script lang="ts" setup>
  import { DivergingBarChart, DivergingBarChartData, DivergingBarChartItem } from '@prefecthq/vue-charts'
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import { FlowRunsHistoryFilter } from '..'
  import { Flow, StateType } from '@/models'
  import { flowRunsApiKey } from '@/services/FlowRunsApi'
  import { inject } from '@/utilities/inject'
  import { ceil } from '@/utilities/math'

  const flowRunsApi = inject(flowRunsApiKey)

  const StateDirections: ReadonlyMap<StateType, 1 | -1> = new Map([
    ['completed', -1],
    ['running', -1],
    ['scheduled', -1],
    ['pending', -1],
    ['failed', 1],
    ['cancelled', 1],
  ])


  const positiveSentimentKeys = [...StateDirections.entries()].filter(([, direction]) => direction < 0).map(([key]) => key)
  const negativeSentimentKeys = [...StateDirections.entries()].filter(([, direction]) => direction > 0).map(([key]) => key)

  const props = defineProps<{
    flow: Flow,
  }>()

  const intervalStart = computed(() => {
    return new Date(props.flow.created)
  })

  const intervalEnd = ref(new Date())

  const intervalSeconds = computed(() => {
    return ceil((intervalEnd.value.getTime() - intervalStart.value.getTime()) / 1000 / 10)
  })

  const historyFilter = computed<FlowRunsHistoryFilter>(() => {
    return {
      history_end: intervalEnd.value.toISOString(),
      history_start: intervalStart.value.toISOString(),
      history_interval_seconds: intervalSeconds.value,
      flows: {
        id: {
          any_: [props.flow.id],
        },
      },
    }
  })

  const getStateColor = (state: StateType): string => `bg-state-${state.toLowerCase()}-500`

  const history = useSubscription(flowRunsApi.getFlowRunsHistory, [historyFilter])

  const items = computed<DivergingBarChartItem[]>(() => {
    const data = (history.response ?? []).map(item => {
      return {
        intervalStart: item.intervalStart,
        intervalEnd: item.intervalEnd,
        data: item.states.reduce<DivergingBarChartData>((data, state) => {
          data[state.stateType] = state.countRuns
          return data
        }, {}),
      }
    }).sort((itemA, itemB) => {
      return itemA.intervalStart.getTime() - itemB.intervalStart.getTime()
    })

    return data
  })
</script>

<style>
.flow-activity-chart__bar {
  @apply
  h-full
  rounded-full
  m-auto
  max-w-[10px]
  w-1/2
}

.flow-activity-chart__median {
  @apply
  h-[2px]
  bg-slate-300
  w-full
}
</style>