<template>
  <div class="flow-run-sub-flows">
    <div class="flow-run-sub-flows__filters">
      <StateNameSelect v-model:selected="states" empty-message="All states" class="flow-run-sub-flows__state" />
      <SearchInput v-model="searchTerm" placeholder="Search by run name" label="Search by run name" />
      <FlowRunsSort v-model="sort" />
    </div>

    <FlowRunList :selected="[]" :flow-runs="flowRuns" disabled @bottom="loadMoreSubFlowRuns" />

    <PEmptyResults v-if="empty">
      <template #message>
        No subflow runs
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
  import FlowRunList from '@/components/FlowRunList.vue'
  import FlowRunsSort from '@/components/FlowRunsSort.vue'
  import SearchInput from '@/components/SearchInput.vue'
  import StateNameSelect from '@/components/StateNameSelect.vue'
  import { useWorkspaceApi } from '@/compositions'
  import { usePaginatedSubscription } from '@/compositions/usePaginatedSubscription'
  import { FlowRun } from '@/models/FlowRun'
  import { TaskRun } from '@/models/TaskRun'
  import { FlowRunSortValues } from '@/types/SortOptionTypes'
  import { UnionFilters } from '@/types/UnionFilters'

  const props = defineProps<{
    flowRunId: string,
  }>()

  const api = useWorkspaceApi()
  const states = ref<string[]>([])
  const searchTerm = ref('')
  const searchTermDebounced = useDebouncedRef(searchTerm, 1200)
  const sort = ref<FlowRunSortValues>('START_TIME_DESC')
  const hasFilters = computed(() => states.value.length || searchTerm.value.length)

  // this is a hack because api/task_runs/filter doesn't support START_TIME_ASC or START_TIME_DESC
  // https://github.com/PrefectHQ/prefect/issues/7730
  const taskRunSort = computed<UnionFilters['sort']>(() => {
    switch (sort.value) {
      case 'START_TIME_ASC':
        return 'EXPECTED_START_TIME_ASC'
      case 'START_TIME_DESC':
        return 'EXPECTED_START_TIME_DESC'
      default:
        return sort.value
    }
  })

  const subFlowRunTaskRunFilter = computed<UnionFilters>(() => {
    const runFilter: UnionFilters = {
      sort: taskRunSort.value,
      'flow_runs': {
        id: {
          any_: [props.flowRunId],
        },
      },
      'task_runs': {
        'subflow_runs': {
          exists_: true,
        },
      },
    }

    if (states.value.length) {
      runFilter.task_runs!.state = {
        name: {
          any_: states.value,
        },
      }
    }

    if (searchTermDebounced.value) {
      runFilter.task_runs!.name = {
        any_: [searchTermDebounced.value],
      }
    }

    return runFilter
  })

  const subFlowRunTaskRunSubscription = usePaginatedSubscription(api.taskRuns.getTaskRuns, [subFlowRunTaskRunFilter])
  const subFlowRunTaskRuns = computed(() => subFlowRunTaskRunSubscription.response ?? [])
  const subFlowRunIds = computed(() => subFlowRunTaskRuns.value.map((run: TaskRun) => run.state!.stateDetails!.childFlowRunId!))

  const subFlowRunsFilter = computed<UnionFilters>(() => {
    const subFlowFilter: UnionFilters = {
      sort: sort.value,
      'flow_runs': {
        id: {
          any_: subFlowRunIds.value,
        },
      },
    }
    return subFlowFilter
  })

  const flowRunsSubscription = usePaginatedSubscription(api.flowRuns.getFlowRuns, [subFlowRunsFilter])

  const flowRuns = computed<FlowRun[]>(() => flowRunsSubscription.response ?? [])
  const empty = computed(() => !flowRunsSubscription.loading && flowRuns.value.length === 0)

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
    states.value = []
    searchTerm.value = ''
  }
</script>


<style>
.flow-run-sub-flows__state { @apply
  mr-auto;
  min-width: 128px;
}

.flow-run-sub-flows__filters { @apply
  flex
  justify-end
  items-center
  gap-2
  mb-4
}
</style>