<template>
  <p-content class="flow-run-task-runs">
    <p-list-header sticky>
      <div class="flow-run-task-runs__count">
        <ResultsCount :count="count" label="Task run" />
        <FlowRunTaskCounts :flow-run-id="flowRunId" />
      </div>
      <template #controls>
        <SearchInput v-model="searchTerm" placeholder="Search by run name" label="Search by run name" class="flow-run-task-runs__search" />
        <StateNameSelect v-model:selected="states" empty-message="All states" multiple />
      </template>
      <template #sort>
        <TaskRunsSort v-model="filter.sort" />
      </template>
    </p-list-header>

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
  </p-content>
</template>

<script lang="ts" setup>
  import { useDebouncedRef } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import {
    ResultsCount,
    SearchInput,
    StateNameSelect,
    TaskRunList,
    TaskRunsSort
  } from '@/components'
  import FlowRunTaskCounts from '@/components/FlowRunTaskCounts.vue'
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
.flow-run-task-runs__search { @apply
  min-w-[224px]
}

.flow-run-task-runs__count { @apply
  grid
  grid-cols-1
  gap-1
}
</style>