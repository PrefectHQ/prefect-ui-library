<template>
  <DateRangeInput
    v-model:startDate="startDate"
    v-model:endDate="endDate"
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
  import { isEqual } from 'lodash'
  import { computed, ref, toRefs, watch } from 'vue'
  import DateRangeInput from '@/components/DateRangeInput.vue'
  import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
  import { FlowRunsHistoryFilter } from '@/models/Filters'
  import { FlowRunHistoryMap } from '@/models/FlowRunHistoryMap'
  import { StateHistory } from '@/models/StateHistory'
  import { StateType } from '@/models/StateType'
  import { secondsInDay } from '@/utilities/dates'
  import { dateFunctions } from '@/utilities/timezone'

  const props = defineProps<{
    range: [Date, Date],
  }>()

  const emit = defineEmits<{
    (event: 'update:range', value: [Date, Date]): void,
  }>()

  const { range } = toRefs(props)
  const startDate = ref<Date | null>()
  const endDate = ref<Date | null>()

  watch([startDate, endDate], ([startDate, endDate]) => {
    const [startDateProp, endDateProp] = range.value
    const sameRange = isEqual(startDate, startDateProp) && isEqual(endDate, endDateProp)

    if (startDate && endDate && !sameRange) {
      emit('update:range', [startDate, endDate])
    }
  })

  watch(range, ([startDateProp, endDateProp]) => {
    startDate.value = startDateProp
    endDate.value = endDateProp
  }, { immediate: true })

  const api = useWorkspaceApi()

  const viewingDate = ref<Date>()

  const flowRunsHistorySubscriptionArgs = computed<Parameters<typeof api.flowRuns.getFlowRunsHistory> | null>(() => {
    if (viewingDate.value === undefined) {
      return null
    }

    const monthStart = dateFunctions.startOfMonth(viewingDate.value)
    const start = dateFunctions.startOfWeek(monthStart)
    const monthEnd = dateFunctions.endOfMonth(viewingDate.value)
    const end = dateFunctions.endOfWeek(monthEnd)

    const historyFilter: FlowRunsHistoryFilter = {
      flowRuns: {
        expectedStartTimeAfter: start,
        expectedStartTimeBefore: end,
      },
      historyStart: start,
      historyEnd: end,
      historyIntervalSeconds: secondsInDay,
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
  border-divider
}
</style>