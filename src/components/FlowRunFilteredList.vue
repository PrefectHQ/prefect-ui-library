<template>
  <div class="flow-run-filtered-list">
    <div class="flow-run-filtered-list__controls">
      <div class="flow-run-filtered-list__controls--right">
        <ResultsCount v-if="selectedFlowRuns.length == 0" :count="flowRunCount" label="Flow run" />
        <SelectedCount v-else :count="selectedFlowRuns.length" />

        <FlowRunsDeleteButton v-if="can.delete.flow_run" :selected="selectedFlowRuns" @delete="deleteFlowRuns" />
      </div>

      <StateSelect :selected="state" empty-message="All run states" class="flow-run-filtered-list__state-select" @update:selected="updateState" />
      <FlowRunsSort v-model="sort" class="flow-run-filtered-list__flow-runs-sort" />
    </div>
    <FlowRunList v-model:selected="selectedFlowRuns" :flow-runs="flowRuns" :disabled="disabled || !can.delete.flow_run" @bottom="flowRunsSubscription.loadMore" />
    <PEmptyResults v-if="empty">
      <template #message>
        No runs from the last 7 days
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
  import { ResultsCount, StateSelect, FlowRunsSort, FlowRunList, SelectedCount, FlowRunsDeleteButton } from '@/components'
  import { useWorkspaceApi } from '@/compositions'
  import { useCan } from '@/compositions/useCan'
  import { usePaginatedSubscription } from '@/compositions/usePaginatedSubscription'
  import { StateType } from '@/models'
  import { mapper } from '@/services'
  import { FlowRunSortValues, UnionFilters } from '@/types'

  type StateTypeOrStateName = StateType | 'late' | 'cancelling'

  const props = defineProps<{
    flowRunFilter: UnionFilters,
    states?: StateTypeOrStateName[],
    disabled?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:states', value: StateTypeOrStateName[]): void,
  }>()

  const can = useCan()
  const api = useWorkspaceApi()
  const selectedFlowRuns = ref<string[]>([])
  const state = ref<StateTypeOrStateName[]>(props.states ?? [])
  const stateWithoutLate = computed(()=> state.value.filter(state => state !== 'late') as StateType[])
  const stateIncludesLate = computed(()=>state.value.includes('late'))
  const stateWithoutCancelling = computed(()=> state.value.filter(state => state !== 'cancelling') as StateType[])
  const stateIncludesCancelling = computed(()=>state.value.includes('cancelling'))

  const updateState = (newValue: string | string[] | null): void => {
    state.value = newValue as StateTypeOrStateName[]
    emit('update:states', state.value)
  }

  const sort = ref<FlowRunSortValues>('START_TIME_DESC')
  const hasFilters = computed(() => state.value.length)

  const filter = computed<UnionFilters>(() => {
    const runFilter: UnionFilters = {
      ...props.flowRunFilter,
      sort: sort.value,
    }

    const flowRunsFilter = {
      ...props.flowRunFilter.flow_runs,
    }

    if (state.value.length) {
      flowRunsFilter.state = {
        type: {
          any_: stateWithoutLate.value.map(state => mapper.map('StateType', state, 'ServerStateType')),
        },
      }

      if (stateIncludesLate.value) {
        flowRunsFilter.state = {
          ...flowRunsFilter.state,
          operator: 'or_',
          name: {
            any_: ['Late'],
          },
        }
      }
    }

    if (state.value.length) {
      flowRunsFilter.state = {
        type: {
          any_: stateWithoutCancelling.value.map(state => mapper.map('StateType', state, 'ServerStateType')),
        },
      }

      if (stateIncludesCancelling.value) {
        flowRunsFilter.state = {
          ...flowRunsFilter.state,
          operator: 'or_',
          name: {
            any_: ['Cancelling'],
          },
        }
      }
    }

    return { ...runFilter, flow_runs: { ...flowRunsFilter } }
  })

  const flowRunCountSubscription = useSubscription(api.flowRuns.getFlowRunsCount, [filter], { interval: 30000 })
  const flowRunCount = computed(() => flowRunCountSubscription.response)

  const flowRunsSubscription = usePaginatedSubscription(api.flowRuns.getFlowRuns, [filter], { interval: 30000 })
  const flowRuns = computed(() => flowRunsSubscription.response ?? [])

  const empty = computed(() => flowRunsSubscription.executed && flowRuns.value.length === 0)

  function clear(): void {
    state.value = []
  }

  const deleteFlowRuns = (): void => {
    selectedFlowRuns.value = []
    flowRunsSubscription.refresh()
    flowRunCountSubscription.refresh()
  }

  onMounted(() => {
    if (props.states) {
      state.value = props.states
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
  bg-white
  bg-opacity-90
  py-2
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