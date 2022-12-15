<template>
  <div class="task-run-logs">
    <div class="task-run-logs__search">
      <LogLevelSelect v-model:selected="logLevel" />
      <LogsSort v-model:selected="logsSort" />
    </div>
    <LogsContainer :logs="logs" @bottom="logsSubscription.loadMore">
      <template #empty>
        <p-empty-results>
          <template #message>
            <div v-if="logLevel > 0">
              No logs match your filter criteria
            </div>
            <div v-else-if="taskRun.stateType == 'scheduled'">
              This run is scheduled and hasn't generated logs
            </div>
            <div v-else-if="taskRun.stateType == 'running'">
              Waiting for logs...
            </div>
            <div v-else>
              This run didn't generate Logs
            </div>
          </template>

          <template v-if="hasFilter" #actions>
            <p-button size="sm" secondary @click="clear">
              Clear Filters
            </p-button>
          </template>
        </p-empty-results>
      </template>
    </LogsContainer>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import LogLevelSelect from '@/components/LogLevelSelect.vue'
  import LogsContainer from '@/components/LogsContainer.vue'
  import LogsSort from '@/components/LogsSort.vue'
  import { useWorkspaceApi } from '@/compositions'
  import { usePaginatedSubscription } from '@/compositions/usePaginatedSubscription'
  import { Log, LogLevel } from '@/models/Log'
  import { TaskRun } from '@/models/TaskRun'
  import { LogsRequestSort, LogsRequestFilter } from '@/types/LogsRequestFilter'

  const props = defineProps<{
    taskRun: TaskRun,
  }>()

  const logLevel = ref<LogLevel>(0)
  const logsSort = ref<LogsRequestSort>('TIMESTAMP_ASC')
  const hasFilter = computed(() => logLevel.value !== 0)
  const logsFilter = computed<LogsRequestFilter>(() => ({
    logs: {
      'task_run_id': {
        any_: [props.taskRun.id],
      },
      level: {
        ge_: logLevel.value,
      },
    },
    sort: logsSort.value,
  }))

  const api = useWorkspaceApi()
  const logsSubscription = usePaginatedSubscription(api.logs.getLogs, [logsFilter], { interval: 5000 })
  const logs = computed<Log[]>(() => logsSubscription.response ?? [])

  function clear(): void {
    logLevel.value = 0
  }
</script>

<style>
.task-run-logs__search { @apply
  flex
  justify-end
  items-center
  mb-4
  gap-2
}
</style>