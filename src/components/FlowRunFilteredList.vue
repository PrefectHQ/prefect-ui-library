<template>
  <div class="flow-runs-controls_list">
    <div class="flow-runs-controls_list__controls">
      <ResultsCount :count="flowRunCount" class="mr-auto" label="Flow run" />
      <StateSelect :selected="state" empty-message="All run states" class="flow-runs-controls_list__state-select" @update:selected="updateState(state)" />
      <FlowRunsSort v-model="sort" class="flow-runs-controls_list__flow-runs-sort" />
    </div>

    <FlowRunList :selected="[]" :flow-runs="flowRuns" disabled @bottom="flowRunsSubscription.loadMore" />

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
  import { usePaginatedSubscription } from '@/compositions/usePaginatedSubscription'
  import { StateType } from '@/models'
  import { flowRunsApiKey, mapper } from '@/services'
  import { FlowRunSortValues, UnionFilters } from '@/types'
  import { inject } from '@/utilities'

  const flowRunsApi = inject(flowRunsApiKey)

  const props = defineProps<{
    flowRunFilter: UnionFilters,
    states?: StateType[],
  }>()

  const emit = defineEmits<{
    (event: 'update:states', value: StateType[]): void,
  }>()

  const state = ref<StateType[]>(props.states ?? [])

  const updateState = (states: StateType[]): void => {
    state.value = states
    emit('update:states', states)
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

  onMounted(() => {
    if (props.states) {
      state.value = props.states
    }
  })
</script>

<style>
.flow-runs-controls_list { @apply
  grid
  gap-2
}

.flow-runs-controls_list__controls { @apply
  flex
  gap-2
  items-center
  flex-col
  sm:flex-row
}

.flow-runs-controls_list__state-select { @apply
  w-full
  sm:w-52
}

.flow-runs-controls_list__flow-runs-sort { @apply
  w-full
  sm:w-fit
}
</style>