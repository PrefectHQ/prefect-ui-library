<template>
  <div class="flow-run-sub-flows">
    <div class="flow-run-sub-flows__filters">
      <StateSelect v-model:selected="state" empty-message="All states" class="mr-auto" />
      <SearchInput v-model="searchTerm" placeholder="Search by run name" label="Search by run name" />
      <FlowRunsSort v-model="sort" />
    </div>

    <FlowRunList :selected="[]" :flow-runs="flowRuns" disabled @bottom="loadMoreSubFlowRuns" />

    <PEmptyResults v-if="empty">
      <template #message>
        No sub flow runs
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
  import { PEmptyResults } from '@prefecthq/prefect-design'
  import { useDebouncedRef } from '@prefecthq/vue-compositions'
  import { computed, ref, watch } from 'vue'
  import { TaskRun, taskRunsApiKey } from '..'
  import FlowRunList from './FlowRunList.vue'
  import FlowRunsSort from './FlowRunsSort.vue'
  import SearchInput from './SearchInput.vue'
  import StateSelect from './StateSelect.vue'
  import { useUnionFiltersSubscription } from '@/compositions/useUnionFiltersSubscription'
  import { FlowRun } from '@/models/FlowRun'
  import { StateType } from '@/models/StateType'
  import { flowRunsApiKey } from '@/services/FlowRunsApi'
  import { mapper } from '@/services/Mapper'
  import { FlowRunSortValues } from '@/types/SortOptionTypes'
  import { UnionFilters } from '@/types/UnionFilters'
  import { inject } from '@/utilities/inject'

  const props = defineProps<{
    flowRunId: string,
  }>()

  const state = ref<StateType[]>([])
  const searchTerm = ref('')
  const searchTermDebounced = useDebouncedRef(searchTerm, 1200)
  const sort = ref<FlowRunSortValues>('EXPECTED_START_TIME_DESC')
  const hasFilters = computed(() => state.value.length || searchTerm.value.length)

  const subFlowRunTaskRunFilter = computed<UnionFilters>(() => {
    const runFilter: UnionFilters = {
      sort: sort.value,
      flow_runs: {
        id: {
          any_: [props.flowRunId],
        },
      },
      task_runs: {
        subflow_runs: {
          exists_: true,
        },
      },
    }
    if (state.value.length) {
      runFilter.task_runs!.state = {
        name: {
          any_: state.value.map(state => mapper.map('StateType', state, 'ServerStateType')),
        },
      }
    }
    if (searchTermDebounced.value) {
      runFilter.task_runs!.name ={
        any_: [searchTermDebounced.value],
      }
    }
    return runFilter
  })

  const taskRunsApi = inject(taskRunsApiKey)
  const subFlowRunTaskRunSubscription = useUnionFiltersSubscription(taskRunsApi.getTaskRuns, [subFlowRunTaskRunFilter.value])
  const subFlowRunTaskRuns = computed(()=> subFlowRunTaskRunSubscription.response ?? [])
  const subFlowRunIds = computed(() => subFlowRunTaskRuns.value.map((run: TaskRun) => run.state!.stateDetails!.childFlowRunId!))

  const subFlowRunsFilter = computed<UnionFilters>(() => {
    const subFlowFilter: UnionFilters = {
      sort: sort.value,
      flow_runs: {
        id: {
          any_: subFlowRunIds.value,
        },
      },
    }
    return subFlowFilter
  })


  const flowRunsApi = inject(flowRunsApiKey)
  const flowRunsSubscription = useUnionFiltersSubscription(flowRunsApi.getFlowRuns, [subFlowRunsFilter])

  const flowRuns = computed<FlowRun[]>(() => flowRunsSubscription.response ?? [])
  const empty = computed(() => flowRunsSubscription.executed && flowRuns.value.length === 0)

  function loadMoreSubFlowRuns(): void {
    const unwatch = watch(subFlowRunIds, (newValue, oldValue) => {
      if (newValue.length > oldValue.length) {
        flowRunsSubscription.loadMore()
        unwatch()
      }
    })
    subFlowRunTaskRunSubscription.loadMore()
  }

  function clear(): void {
    state.value = []
    searchTerm.value = ''
  }
</script>


<style>
.flow-run-sub-flows__filters { @apply
  flex
  justify-end
  items-center
  gap-2
  mb-4
}
</style>