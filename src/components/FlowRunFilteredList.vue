<template>
  <div class="flow-run-filtered-list">
    <div ref="stickyControls" class="flow-run-filtered-list__controls" :class="classes.header">
      <div class="flow-run-filtered-list__controls--right">
        <ResultsCount v-if="selectedFlowRuns.length == 0" :count="total" label="Flow run" />
        <SelectedCount v-else :count="selectedFlowRuns.length" />

        <FlowRunsDeleteButton v-if="can.delete.flow_run" :selected="selectedFlowRuns" @delete="deleteFlowRuns" />
      </div>

      <StateNameSelect :selected="states" empty-message="All run states" class="flow-run-filtered-list__state-select" @update:selected="updateState" />
      <FlowRunsSort v-model="sort" class="flow-run-filtered-list__flow-runs-sort" />
    </div>
    <FlowRunList v-model:selected="selectedFlowRuns" :flow-runs="flowRuns" :selectable="!disableDeletion && can.delete.flow_run" @bottom="next" />
    <PEmptyResults v-if="empty">
      <template #message>
        <slot name="empty-message">
          No runs found
        </slot>
      </template>
      <template v-if="hasFilters" #actions>
        <p-button small @click="clear">
          Clear Filters
        </p-button>
      </template>
    </PEmptyResults>
  </div>
</template>

<script lang="ts" setup>
  import { usePositionStickyObserver } from '@prefecthq/vue-compositions'
  import { computed, onMounted, ref } from 'vue'
  import { ResultsCount, StateNameSelect, FlowRunsSort, FlowRunList, SelectedCount, FlowRunsDeleteButton } from '@/components'
  import { useFlowRuns } from '@/compositions'
  import { useCan } from '@/compositions/useCan'
  import { FlowRunsFilter } from '@/models/Filters'
  import { FlowRunSortValues, PrefectStateNames } from '@/types'

  const props = defineProps<{
    flowRunFilter: FlowRunsFilter,
    states?: PrefectStateNames[],
    disableDeletion?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:states', value: PrefectStateNames[]): void,
  }>()

  const can = useCan()
  const selectedFlowRuns = ref<string[]>([])
  const states = ref<PrefectStateNames[]>(props.states ?? [])
  const stickyControls = ref<HTMLElement>()

  const updateState = (newValue: string | string[] | null): void => {
    states.value = newValue as PrefectStateNames[]
    emit('update:states', states.value)
  }

  const sort = ref<FlowRunSortValues>(props.flowRunFilter.sort ?? 'START_TIME_DESC')
  const hasFilters = computed(() => states.value.length)

  const filter = computed<FlowRunsFilter>(() => ({
    ...props.flowRunFilter,
    flowRuns: {
      ...props.flowRunFilter.flowRuns,
      state: {
        name: states.value.length ? states.value : props.flowRunFilter.flowRuns?.state?.name,
      },
    },
    sort: sort.value,
  }))

  const { flowRuns, total, subscriptions, next } = useFlowRuns(filter, {
    interval: 30000,
    mode: 'infinite',
  })

  const empty = computed(() => subscriptions.executed && flowRuns.value.length === 0)

  const { stuck } = usePositionStickyObserver(stickyControls)

  const classes = computed(() => ({
    header: {
      'flow-run-filtered-list__controls--stuck': stuck.value,
    },
  }))

  function clear(): void {
    states.value = []
  }

  const deleteFlowRuns = (): void => {
    selectedFlowRuns.value = []
    subscriptions.refresh()
  }

  onMounted(() => {
    if (props.states) {
      states.value = props.states
    }
  })
</script>

<style>
.flow-run-filtered-list { @apply
  grid
  gap-2
}

.flow-run-filtered-list__controls { @apply
  flex
  gap-2
  items-center
  flex-col
  sm:flex-row
  sticky
  rounded-b-default
  top-0
  p-2
  z-10
}

.flow-run-filtered-list__controls--stuck { @apply
  bg-floating-sticky
  backdrop-blur-sm
  shadow-md
}

.flow-run-filtered-list__controls--right { @apply
  mr-auto
  flex
  gap-2
  items-center
}

.flow-run-filtered-list__state-select { @apply
  w-full
  sm:w-52
}

.flow-run-filtered-list__flow-runs-sort { @apply
  w-full
  sm:w-fit
}
</style>