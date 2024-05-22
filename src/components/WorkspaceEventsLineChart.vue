<template>
  <div ref="container" class="workspace-events-line-chart">
    <ChartCursor v-model:cursor="cursor" v-bind="{ startDate, endDate }">
      <ChartSelection v-model:selection-start="selectionStart" v-model:selection-end="selectionEnd" v-bind="{ startDate, endDate }">
        <ChartZoom v-model:start-date="startDate" v-model:end-date="endDate" :options="zoomOptions">
          <LineChart :class="classes.chart" :data="data" :options="{ curve: 'bumpX', startDate, endDate }" />
        </ChartZoom>

        <template #label="{ start, end }">
          {{ formatSelection(start) }} - {{ formatSelection(end) }}
        </template>
      </ChartSelection>

      <template #label="{ value }">
        <span class="chart-cursor__date">{{ formatDate(value) }}</span>
        <span class="chart-cursor__time">{{ formatTime(value) }}</span>
      </template>
    </ChartCursor>
  </div>
</template>

<script lang="ts" setup>
  import { ChartCursor, ChartSelection, LineChart, LineChartData, LineChartDataPoint, useChartCursor, useChartSelection, ChartZoom, ChartZoomOptions } from '@prefecthq/vue-charts'
  import { useDebouncedRef, useSubscriptionWithDependencies } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import { useEventsTimeInterval } from '@/compositions/useEventsTimeInterval'
  import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'
  import { WorkspaceEventsFilter } from '@/types/workspaceEventsFilter'
  import { WorkspaceEventsHistory } from '@/types/workspaceEventsHistory'
  import { formatDate, formatTime } from '@/utilities/dates'
  import { dateFunctions } from '@/utilities/timezone'

  const props = defineProps<{
    startDate: Date,
    endDate: Date,
    filter: WorkspaceEventsFilter,
    zoomOptions?: ChartZoomOptions,
  }>()

  const emit = defineEmits<{
    (event: 'update:startDate' | 'update:endDate', value: Date): void,
  }>()

  const startDate = computed({
    get() {
      return props.startDate
    },
    set(value) {
      emit('update:startDate', value)
    },
  })

  const endDate = computed({
    get() {
      return props.endDate
    },
    set(value) {
      emit('update:endDate', value)
    },
  })

  const { cursor } = useChartCursor()
  const container = ref<HTMLElement>()
  const { interval } = useEventsTimeInterval({ startDate, endDate, container })
  const { selectionStart, selectionEnd } = useChartSelection()
  const api = useWorkspaceApi()

  const historyRequest = computed<[WorkspaceEventsHistory] | null>(() => {
    if (!interval.value) {
      return null
    }

    return [
      {
        unit: 'second',
        interval: interval.value,
        filter: {
          ...props.filter,
          occurred: {
            since: props.startDate,
            until: props.endDate,
          },
        },
      },
    ]
  })
  const historyRequestDebounced = useDebouncedRef(historyRequest, 500)

  const subscription = useSubscriptionWithDependencies(api.events.getEventsHistory, historyRequestDebounced)
  const history = computed(() => subscription.response ?? [])
  const loading = computed(() => subscription.loading)

  const data = computed<LineChartData>(() => history.value.map<LineChartDataPoint>(item => {
    const x = new Date((item.intervalStart.getTime() + item.intervalEnd.getTime()) / 2)
    const y = item.value

    return [x, y]
  }))

  const classes = computed(() => ({
    chart: {
      'workspace-events-line-chart--loading': loading.value,
    },
  }))

  function formatSelection(value: Date): string {
    return dateFunctions.format(value, 'MMM do, hh:mm a')
  }
</script>

<style>
.workspace-events-line-chart { @apply
  pt-1
  transition-none
}

.workspace-events-line-chart--loading { @apply
  opacity-50
}
</style>