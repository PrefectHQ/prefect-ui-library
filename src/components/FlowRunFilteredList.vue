<template>
  <div class="flow-run-filtered-list">
    <div class="flow-run-filtered-list__controls">
      <ResultsCount :count="flowRunCount" class="mr-auto" label="Flow run" />
      <StateSelect :selected="state" empty-message="All run states" class="flow-run-filtered-list__state-select" @update:selected="updateState" />
      <FlowRunsSort v-model="sort" class="flow-run-filtered-list__flow-runs-sort" />
      <DeleteFlowRunsButton v-if="can.delete.flow_run" :selected="selectedFlowRuns" @delete="deleteFlowRuns" />
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
  import { ResultsCount, StateSelect, FlowRunsSort, FlowRunList } from '@/components'
  import DeleteFlowRunsButton from '@/components/DeleteFlowRunsButton.vue'
  import { useCan } from '@/compositions/useCan'
  import { usePaginatedSubscription } from '@/compositions/usePaginatedSubscription'
  import { StateType } from '@/models'
  import { flowRunsApiKey, mapper } from '@/services'
  import { FlowRunSortValues, UnionFilters } from '@/types'
  import { inject } from '@/utilities'

  const flowRunsApi = inject(flowRunsApiKey)

  const props = defineProps<{
    flowRunFilter: UnionFilters,
    states?: StateType[],
    disabled?: boolean,
  }>()

  const emit = defineEmits<{
    (event: 'update:states', value: StateType[]): void,
  }>()

  const can = useCan()
  const selectedFlowRuns = ref<string[]>([])
  const state = ref<StateType[]>(props.states ?? [])

  const updateState = (newValue: string | string[] | null): void => {
    state.value = newValue as StateType[]
    emit('update:states', state.value)
  }

  const sort = ref<FlowRunSortValues>('EXPECTED_START_TIME_DESC')
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
          any_: state.value.map(state => mapper.map('StateType', state, 'ServerStateType')),
        },
      }
    }

    return { ...runFilter, flow_runs: { ...flowRunsFilter } }
  })

  const flowRunCountSubscription = useSubscription(flowRunsApi.getFlowRunsCount, [filter], { interval: 30000 })
  const flowRunCount = computed(() => flowRunCountSubscription.response)

  const flowRunsSubscription = usePaginatedSubscription(flowRunsApi.getFlowRuns, [filter], { interval: 30000 })
  const flowRuns = computed(() => flowRunsSubscription.response ?? [])

  const empty = computed(() => flowRunsSubscription.executed && flowRuns.value.length === 0)

  function clear(): void {
    state.value = []
  }

  const deleteFlowRuns = async (): Promise<void> => {
    selectedFlowRuns.value = []
    await Promise.all([flowRunsSubscription.refresh(), flowRunCountSubscription.refresh()])
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