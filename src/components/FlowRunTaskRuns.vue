<template>
  <div class="flow-run-task-runs">
    <div class="flow-run-task-runs__filters">
      <StateSelect v-model:selected="state" empty-message="All states" class="mr-auto" />
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
  import SearchInput from './SearchInput.vue'
  import StateSelect from './StateSelect.vue'
  import TaskRunList from './TaskRunList.vue'
  import TaskRunsSort from './TaskRunsSort.vue'
  import { useUnionFiltersSubscription } from '@/compositions/useUnionFiltersSubscription'
  import { StateType } from '@/models/StateType'
  import { TaskRun } from '@/models/TaskRun'
  import { mapper } from '@/services/Mapper'
  import { taskRunsApiKey } from '@/services/TaskRunsApi'
  import { TaskRunSortValues } from '@/types/SortOptionTypes'
  import { TaskRunFilter, UnionFilters } from '@/types/UnionFilters'
  import { inject } from '@/utilities/inject'

  const props = defineProps<{
    flowRunId: string,
  }>()

  const state = ref<StateType[]>([])
  const searchTerm = ref('')
  const searchTermDebounced = useDebouncedRef(searchTerm, 1200)
  const sort = ref<TaskRunSortValues>('EXPECTED_START_TIME_DESC')
  const hasFilters = computed(() => state.value.length || searchTerm.value.length)

  const filter = computed<UnionFilters>(() => {
    const runFilter: UnionFilters = {
      flow_runs: {
        id: {
          any_: [props.flowRunId],
        },
      },
      sort: sort.value,
    }

    const taskRunsFilter: TaskRunFilter = {}

    if (searchTermDebounced.value) {
      taskRunsFilter.name = {
        any_: [searchTermDebounced.value],
      }
    }

    if (state.value.length) {
      taskRunsFilter.state = {
        name: {
          any_: state.value.map(state => mapper.map('StateType', state, 'ServerStateType')),
        },
      }
    }

    return  { ...runFilter, task_runs: { ...taskRunsFilter } }
  })

  const taskRunsApi = inject(taskRunsApiKey)
  const taskRunsSubscription = useUnionFiltersSubscription(taskRunsApi.getTaskRuns, [filter], { interval: 30000 })
  const taskRuns = computed<TaskRun[]>(() => taskRunsSubscription.response ?? [])
  const empty = computed(() => taskRunsSubscription.executed && taskRuns.value.length === 0)

  function clear(): void {
    state.value = []
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