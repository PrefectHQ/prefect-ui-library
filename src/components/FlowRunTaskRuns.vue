<template>
  <div class="flow-run-task-runs">
    <div class="flow-run-task-runs__filters">
      <StateNameSelect v-model:selected="states" empty-message="All states" class="mr-auto" />
      <SearchInput v-model="searchTerm" placeholder="Search by run name" label="Search by run name" />
      <TaskRunsSort v-model="sort" />
    </div>

    <TaskRunList :selected="[]" :task-runs="taskRuns" disabled @bottom="taskRunsSubscription.loadMore" />

    <PEmptyResults v-if="empty">
      <template #message>
        No task runs
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
  import { useDebouncedRef } from '@prefecthq/vue-compositions'
  import { computed, ref } from 'vue'
  import SearchInput from '@/components/SearchInput.vue'
  import StateNameSelect from '@/components/StateNameSelect.vue'
  import TaskRunList from '@/components/TaskRunList.vue'
  import TaskRunsSort from '@/components/TaskRunsSort.vue'
  import { useWorkspaceApi } from '@/compositions'
  import { usePaginatedSubscription } from '@/compositions/usePaginatedSubscription'
  import { TaskRunsFilter } from '@/models/Filters'
  import { TaskRun } from '@/models/TaskRun'
  import { TaskRunSortValues } from '@/types/SortOptionTypes'

  const props = defineProps<{
    flowRunId: string,
  }>()

  const states = ref<string[]>([])
  const searchTerm = ref('')
  const searchTermDebounced = useDebouncedRef(searchTerm, 1200)
  const sort = ref<TaskRunSortValues>('EXPECTED_START_TIME_DESC')
  const hasFilters = computed(() => states.value.length || searchTerm.value.length)

  const filter = computed<TaskRunsFilter>(() => ({
    flowRuns: {
      id: [props.flowRunId],
    },
    taskRuns: {
      subFlowRunsExist: false,
      nameLike: searchTermDebounced.value,
      state: {
        name: states.value,
      },
    },
    sort: sort.value,
  }))

  const api = useWorkspaceApi()
  const taskRunsSubscription = usePaginatedSubscription(api.taskRuns.getTaskRuns, [filter], { interval: 30000 })
  const taskRuns = computed<TaskRun[]>(() => taskRunsSubscription.response ?? [])
  const empty = computed(() => taskRunsSubscription.executed && taskRuns.value.length === 0)

  function clear(): void {
    states.value = []
    searchTerm.value = ''
  }
</script>

<style>
.flow-run-task-runs__filters { @apply
  flex
  justify-end
  items-center
  gap-2
  mb-4
}
</style>