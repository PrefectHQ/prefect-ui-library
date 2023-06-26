<template>
  <div class="flow-run-filtered-list">
    <div class="flow-run-filtered-list__controls">
      <div class="flow-run-filtered-list__controls--right">
        <ResultsCount v-if="selectedFlowRuns.length == 0" :count="flowRunCount" label="Flow run" />
        <SelectedCount v-else :count="selectedFlowRuns.length" />

        <FlowRunsDeleteButton v-if="can.delete.flow_run" :selected="selectedFlowRuns" @delete="deleteFlowRuns" />
      </div>

      <StateNameSelect :selected="states" empty-message="All run states" class="flow-run-filtered-list__state-select" @update:selected="updateState" />
      <FlowRunsSort v-model="sort" class="flow-run-filtered-list__flow-runs-sort" />
    </div>
    <FlowRunList v-model:selected="selectedFlowRuns" :flow-runs="flowRuns" :selectable="!disableDeletion && can.delete.flow_run" @bottom="loadMore" />
    <PEmptyResults v-if="empty">
      <template #message>
        <slot name="empty-message">
          No runs found
        </slot>
      </template>
      <template v-if="hasFilters" #actions>
        <p-button size="sm" secondary @click="clear">
          Clear Filters
        </p-button>
      </template>
    </PEmptyResults>
  </div>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed, onMounted, ref } from 'vue'
  import { ResultsCount, StateNameSelect, FlowRunsSort, FlowRunList, SelectedCount, FlowRunsDeleteButton } from '@/components'
  import { useFlowRunsInfiniteScroll, useWorkspaceApi } from '@/compositions'
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
  const api = useWorkspaceApi()
  const selectedFlowRuns = ref<string[]>([])
  const states = ref<PrefectStateNames[]>(props.states ?? [])

  const updateState = (newValue: string | string[] | null): void => {
    states.value = newValue as PrefectStateNames[]
    emit('update:states', states.value)
  }

  const sort = ref<FlowRunSortValues>('START_TIME_DESC')
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

  const flowRunCountSubscription = useSubscription(api.flowRuns.getFlowRunsCount, [filter], { interval: 30000 })
  const flowRunCount = computed(() => flowRunCountSubscription.response)

  const { flowRuns, subscriptions, loadMore } = useFlowRunsInfiniteScroll(filter, { interval: 3000 })

  const empty = computed(() => subscriptions.executed && flowRuns.value.length === 0)

  function clear(): void {
    states.value = []
  }

  const deleteFlowRuns = (): void => {
    selectedFlowRuns.value = []
    subscriptions.refresh()
    flowRunCountSubscription.refresh()
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
  top-0
  bg-opacity-90
  dark:bg-opacity-90
  bg-background-600
  dark:bg-background-400
  p-2
  z-10
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