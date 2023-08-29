<template>
  <DivergingBarChart
    class="activity-chart"
    :items="items"
    :interval-start="intervalStart"
    :interval-end="intervalEnd"
    :interval-seconds="intervalSeconds"
    :positive-sentiment-keys="positiveSentimentKeys"
    :negative-sentiment-keys="negativeSentimentKeys"
    static-median
    :chart-padding="{ top: 0, bottom: 0, middle: 4 }"
  >
    <template #default="{ key }">
      <div class="activity-chart__bar" :class="getStateColor(key)" />
    </template>

    <template #median>
      <div class="activity-chart__median" />
    </template>

    <template #empty>
      <div class="activity-chart__empty" />
    </template>
  </DivergingBarChart>
</template>

<script lang="ts" setup>
  import { DivergingBarChart } from '@prefecthq/vue-charts'
  import { computed } from 'vue'
  import { RunHistory, StateType } from '@/models'
  import { mapper } from '@/services'
  import { sortDates } from '@/utilities/dates'

  const props = defineProps<{
    intervalStart: Date,
    intervalEnd: Date,
    intervalSeconds: number,
    history: RunHistory[],
  }>()

  const StateDirections: ReadonlyMap<StateType, 1 | -1> = new Map([
    ['completed', -1],
    ['running', -1],
    ['scheduled', -1],
    ['pending', -1],
    ['paused', -1],
    ['failed', 1],
    ['cancelled', 1],
    ['crashed', 1],
  ])

  const positiveSentimentKeys = [...StateDirections.entries()].filter(([, direction]) => direction < 0).map(([key]) => key)
  const negativeSentimentKeys = [...StateDirections.entries()].filter(([, direction]) => direction > 0).map(([key]) => key)

  const getStateColor = (state: string): string => `bg-state-${state.toLowerCase()}-500`

  const items = computed(() => mapper
    .map('RunHistory', props.history, 'DivergingBarChartItem')
    .sort((itemA, itemB) => sortDates(itemA.intervalStart, itemB.intervalEnd)),
  )
</script>

<style>
.activity-chart__bar {
  @apply
  h-full
  rounded-full
  m-auto
  max-w-[10px]
  w-1/2
}

.activity-chart__median {
  @apply
  h-px
  bg-divider
  w-full
}
</style>