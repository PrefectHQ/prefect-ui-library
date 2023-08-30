<template>
  <div class="flow-run-sub-flows">
    <div class="flow-run-sub-flows__filters">
      <ResultsCount :count="count ?? 0" label="Subflow run" class="flow-run-sub-flows__count" />
      <SearchInput v-model="searchTerm" placeholder="Search by run name" label="Search by run name" class="flow-run-sub-flows__search" />
      <FlowRunsSort v-model="sort" class="flow-run-sub-flows__sort" />
      <StateNameSelect v-model:selected="states" empty-message="All states" class="flow-run-sub-flows__state" />
    </div>

    <template v-if="!empty">
      <FlowRunList :flow-runs="subflowRuns" @bottom="loadMoreSubFlowRuns" />
    </template>

    <PEmptyResults v-if="empty">
      <template #message>
        No subflow runs
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
  import { PEmptyResults } from '@prefecthq/prefect-design'
  import { useDebouncedRef } from '@prefecthq/vue-compositions'
  import { computed, ref, watch } from 'vue'
  import FlowRunList from '@/components/FlowRunList.vue'
  import FlowRunsSort from '@/components/FlowRunsSort.vue'
  import ResultsCount from '@/components/ResultsCount.vue'
  import SearchInput from '@/components/SearchInput.vue'
  import StateNameSelect from '@/components/StateNameSelect.vue'
  import { useFlowRunsCount, useFlowRunsInfiniteScroll, useWorkspaceApi } from '@/compositions'
  import { usePaginatedSubscription } from '@/compositions/usePaginatedSubscription'
  import { FlowRunsFilter, TaskRunsFilter } from '@/models/Filters'
  import { TaskRun } from '@/models/TaskRun'
  import { Getter } from '@/types/reactivity'
  import { FlowRunSortValues, isTaskRunSortValue, TaskRunSortValues } from '@/types/SortOptionTypes'

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
  const taskRunSort = computed<TaskRunSortValues>(() => {
    if (sort.value === 'START_TIME_ASC') {
      return 'EXPECTED_START_TIME_ASC'
    }

    if (sort.value === 'START_TIME_DESC') {
      return 'EXPECTED_START_TIME_DESC'
    }

    // this should never happen but this makes typescript happy
    if (!isTaskRunSortValue(sort.value)) {
      throw new Error('Invalid task run sort')
    }

    return sort.value
  })

  const subFlowRunTaskRunFilter = computed<TaskRunsFilter>(() => ({
    flowRuns: {
      id: [props.flowRunId],
    },
    taskRuns: {
      subFlowRunsExist: true,
      state: {
        name: states.value,
      },
    },
    sort: taskRunSort.value,
  }))
  const subFlowRunTaskRunSubscription = usePaginatedSubscription(api.taskRuns.getTaskRuns, [subFlowRunTaskRunFilter])
  const subFlowRunTaskRuns = computed(() => subFlowRunTaskRunSubscription.response ?? [])
  const subFlowRunIds = computed(() => subFlowRunTaskRuns.value.map((run: TaskRun) => run.state!.stateDetails!.childFlowRunId!))

  const subFlowRunsFilter: Getter<FlowRunsFilter | null> = () => {
    if (!subFlowRunIds.value.length) {
      return null
    }

    return {
      flowRuns: {
        id: subFlowRunIds.value,
        nameLike: searchTermDebounced.value,
      },
      sort: sort.value,
    }
  }

  const { flowRuns: subflowRuns, subscriptions: subFlowRunsSubscriptions, loadMore } = useFlowRunsInfiniteScroll(subFlowRunsFilter)
  const empty = computed(() => !subFlowRunsSubscriptions.loading && subFlowRunIds.value.length === 0)
  const { count } = useFlowRunsCount(subFlowRunsFilter)

  function loadMoreSubFlowRuns(): void {
    const unwatch = watch(subFlowRunIds, (newValue, oldValue) => {
      if (newValue.length > oldValue.length) {
        loadMore()
        unwatch()
      }
    })

    subFlowRunTaskRunSubscription.loadMore()
  }

  function clear(): void {
    states.value = []
    searchTerm.value = ''
  }

  // always load the first page
  loadMoreSubFlowRuns()
</script>


<style>
.flow-run-sub-flows__filters { @apply
  grid
  items-center
  gap-2
  mb-4;
  grid-template-areas: "search search"
                        "state state"
                        "count sort";
  grid-template-columns: 1fr min-content
}

@screen md {
  .flow-run-sub-flows__filters {
    grid-template-areas: "count search sort state";
    grid-template-columns: 1fr max-content min-content min-content;
  }
}

.flow-run-sub-flows__count {
  grid-area: count;
}

.flow-run-sub-flows__search {
  grid-area: search;
}

.flow-run-sub-flows__sort {
  grid-area: sort;
}

.flow-run-sub-flows__state {
  grid-area: state;
}
</style>