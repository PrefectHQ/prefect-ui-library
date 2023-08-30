<template>
  <div class="flow-run-task-runs">
    <div class="flow-run-task-runs__filters">
      <ResultsCount :count="count" label="Task run" class="flow-run-task-runs__count" />
      <SearchInput v-model="searchTerm" placeholder="Search by run name" label="Search by run name" class="flow-run-task-runs__search" />
      <StateNameSelect v-model:selected="states" empty-message="All states" class="flow-run-task-runs__state" />
      <TaskRunsSort v-model="filter.sort" class="flow-run-task-runs__sort" />
    </div>

    <TaskRunList :task-runs="taskRuns" @bottom="taskRunsSubscription.loadMore" />

    <PEmptyResults v-if="empty">
      <template #message>
        No task runs
      </template>
      <template v-if="isCustomFilter" #actions>
        <p-button small @click="clear">
          Clear Filters
        </p-button>
      </template>
    </PEmptyResults>
  </div>
</template>

<script lang="ts" setup>
  import { useDebouncedRef } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import ResultsCount from '@/components/ResultsCount.vue'
  import SearchInput from '@/components/SearchInput.vue'
  import StateNameSelect from '@/components/StateNameSelect.vue'
  import TaskRunList from '@/components/TaskRunList.vue'
  import TaskRunsSort from '@/components/TaskRunsSort.vue'
  import { useTaskRunsCount, useTaskRunsFilter, useWorkspaceApi } from '@/compositions'
  import { usePaginatedSubscription } from '@/compositions/usePaginatedSubscription'
  import { TaskRun } from '@/models/TaskRun'

  const props = defineProps<{
    flowRunId: string,
  }>()

  const states = ref<string[]>([])
  const searchTerm = ref<string>()
  const searchTermDebounced = useDebouncedRef(searchTerm, 1200)
  const flowRunsIds = computed(() => [props.flowRunId])

  const { filter, isCustomFilter } = useTaskRunsFilter({
    flowRuns: {
      id: flowRunsIds,
    },
    taskRuns: {
      subFlowRunsExist: false,
      nameLike: searchTermDebounced,
      state: {
        name: states,
      },
    },
  })

  const api = useWorkspaceApi()
  const taskRunsSubscription = usePaginatedSubscription(api.taskRuns.getTaskRuns, [filter], { interval: 30000 })
  const taskRuns = computed<TaskRun[]>(() => taskRunsSubscription.response ?? [])
  const empty = computed(() => taskRunsSubscription.executed && taskRuns.value.length === 0)
  const { count } = useTaskRunsCount(filter)

  function clear(): void {
    states.value = []
    searchTerm.value = ''
  }
</script>

<style>
.flow-run-task-runs__filters { @apply
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
  .flow-run-task-runs__filters {
    grid-template-areas: "count search state sort";
    grid-template-columns: 1fr max-content min-content min-content;
  }
}

.flow-run-task-runs__count {
  grid-area: count;
}

.flow-run-task-runs__search {
  grid-area: search;
}

.flow-run-task-runs__sort {
  grid-area: sort;
}

.flow-run-task-runs__state {
  grid-area: state;
}
</style>