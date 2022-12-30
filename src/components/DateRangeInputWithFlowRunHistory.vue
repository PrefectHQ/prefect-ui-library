<template>
  <DateRangeInput
    v-model:startDate="internalStartDate"
    v-model:endDate="internalEndDate"
    v-model:viewingDate="viewingDate"
    clearable
  >
    <template #date="{ date }">
      <div class="date-range-input-with-flow-run-history__date">
        <div class="date-range-input-with-flow-run-history__date-value">
          {{ date.getDate() }}
        </div>
        <template v-for="history in flowRunsHistory.get(date)" :key="`${date.toISOString}-${history.stateType}`">
          <div class="date-range-input-with-flow-run-history__date-indicator" :class="`bg-state-${history.stateType}-200`" />
        </template>
      </div>
    </template>
  </DateRangeInput>
</template>

<script lang="ts" setup>
  import { useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { computed, ref, watch } from 'vue'
  import DateRangeInput from '@/components/DateRangeInput.vue'
  import { useFlowRunFilterFromRoute } from '@/compositions/useFlowRunFilterFromRoute'
  import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
  import { FlowRunHistoryMap } from '@/models/FlowRunHistoryMap'
  import { FlowRunsHistoryFilter } from '@/types/UnionFilters'
  import { secondsInDay } from '@/utilities/dates'
  import { dateFunctions } from '@/utilities/timezone'

  const api = useWorkspaceApi()

  const { startDate, endDate, updateFilters, filter } = useFlowRunFilterFromRoute()

  const internalStartDate = ref<Date | null>(startDate.value)
  const internalEndDate = ref<Date | null>(endDate.value)
  const viewingDate = ref<Date>()

  watch([internalStartDate, internalEndDate], ([startDate, endDate]) => {
    if (startDate && endDate) {
      updateFilters({ startDate, endDate })
    }
  })

  const flowRunsHistorySubscriptionArgs = computed<Parameters<typeof api.flowRuns.getFlowRunsHistory> | null>(() => {
    if (viewingDate.value === undefined) {
      return null
    }

    const monthStart = dateFunctions.startOfMonth(viewingDate.value)
    const start = dateFunctions.startOfWeek(monthStart)
    const monthEnd = dateFunctions.endOfMonth(viewingDate.value)
    const end = dateFunctions.endOfWeek(monthEnd)

    const historyFilter: FlowRunsHistoryFilter = {
      'flow_runs': {
        ...filter.value.flow_runs,
        'state': undefined,
      },
      'history_start': start.toISOString(),
      'history_end': end.toISOString(),
      'history_interval_seconds': secondsInDay,
    }

    return [historyFilter]
  })
  const flowRunsHistorySubscription = useSubscriptionWithDependencies(api.flowRuns.getFlowRunsHistory, flowRunsHistorySubscriptionArgs)
  const flowRunsHistory = computed(() => new FlowRunHistoryMap(flowRunsHistorySubscription.response ?? []))
</script>

<style>
.date-range-input-with-flow-run-history__date { @apply
  flex
  flex-wrap
  justify-center
  gap-1
}

.date-range-input-with-flow-run-history__date-value { @apply
  w-full
}

.date-range-input-with-flow-run-history__date-indicator { @apply
  h-1
  w-1
  flex-grow-0
  flex-shrink-0
  rounded-full
  border
}
</style>