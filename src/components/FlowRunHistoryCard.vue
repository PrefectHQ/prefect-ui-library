<template>
  <p-card class="flow-run-history-card">
    <header class="flow-run-history-card__header">
      <p-heading heading="5">
        Flow Runs
      </p-heading>
      <template v-if="count">
        <StatisticKeyValue label="total" :value="count" />
      </template>
    </header>
    <FlowRunsBarChart class="flow-run-history-card__chart" :filter="filter" />
  </p-card>
</template>

<script lang="ts" setup>
  import { toRefs } from 'vue'
  import FlowRunsBarChart from '@/components/FlowRunsBarChart.vue'
  import StatisticKeyValue from '@/components/StatisticKeyValue.vue'
  import { useFlowRunsCount, useInterval } from '@/compositions'
  import { FlowRunsFilter } from '@/models'

  const props = defineProps<{
    filter: FlowRunsFilter,
  }>()

  const options = useInterval()
  const { filter } = toRefs(props)

  const { count } = useFlowRunsCount(filter, options)
</script>

<style>
.flow-run-history-card { @apply
  flex
  flex-col
  gap-4
}

.flow-run-history-card__header { @apply
  flex
  items-center
  justify-between
}

.flow-run-history-card__chart { @apply
  min-h-[20px]
  flex-grow
}
</style>