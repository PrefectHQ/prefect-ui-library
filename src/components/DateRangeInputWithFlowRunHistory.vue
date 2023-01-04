<template>
  <DateRangeInput
    v-model:startDate="internalStartDate"
    v-model:endDate="internalEndDate"
    v-model:viewingDate="viewingDate"
    clearable
  >
    <template #date="{ date }">
      <div class="date-range-input-with-flow-run-history__date">
        <p>{{ date.getDate() }}</p>
        <div class="date-range-input-with-flow-run-history__indicators">
          <template v-for="history in getRunHistory(date)" :key="getRunHistoryKey(date, history.stateType)">
            <div class="date-range-input-with-flow-run-history__indicator" :class="`bg-state-${history.stateType}-600`" />
          </template>
        </div>
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
  import { StateHistory } from '@/models/StateHistory'
  import { StateType } from '@/models/StateType'
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
        'expected_start_time': {
          'after_': start.toISOString(),
          'before_': end.toISOString(),
        },
      },
      'history_start': start.toISOString(),
      'history_end': end.toISOString(),
      'history_interval_seconds': secondsInDay,
    }

    return [historyFilter]
  })
  const flowRunsHistorySubscription = useSubscriptionWithDependencies(api.flowRuns.getFlowRunsHistory, flowRunsHistorySubscriptionArgs)
  const flowRunsHistory = computed(() => new FlowRunHistoryMap(flowRunsHistorySubscription.response ?? []))

  function getRunHistory(date: Date): StateHistory[] {
    return flowRunsHistory.value.get(date)
      .filter(history => history.countRuns > 0)
      .sort((h1, h2) => h2.countRuns - h1.countRuns)
      .slice(0, 2)
  }

  function getRunHistoryKey(date: Date, state: StateType): string {
    return `${date.toISOString()}-${state}`
  }
</script>

<style>
.date-range-input-with-flow-run-history__date { @apply
  flex
  flex-col
  items-center
  gap-1
}

.date-range-input-with-flow-run-history__indicators { @apply
  flex
  h-1
  gap-[1px]
  items-center
}

.date-range-input-with-flow-run-history__indicator { @apply
  h-1.5
  w-1.5
  flex-grow-0
  flex-shrink-0
  rounded-full
  border
}
</style>