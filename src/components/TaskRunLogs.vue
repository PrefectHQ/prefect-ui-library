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
            <p-button small @click="clear">
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
  import { useLogsSort, useWorkspaceApi } from '@/compositions'
  import { usePaginatedSubscription } from '@/compositions/usePaginatedSubscription'
  import { useStatePolling } from '@/compositions/useStatePolling'
  import { LogsFilter } from '@/models/Filters'
  import { Log, LogLevel } from '@/models/Log'
  import { TaskRun } from '@/models/TaskRun'

  const props = defineProps<{
    taskRun: TaskRun,
  }>()

  const logLevel = ref<LogLevel>(0)
  const { sort: logsSort } = useLogsSort()
  const hasFilter = computed(() => logLevel.value !== 0)
  const logsFilter = computed<LogsFilter>(() => ({
    logs: {
      taskRunId: [props.taskRun.id],
      levelGreaterThan: logLevel.value,
    },
    sort: logsSort.value,
  }))

  const api = useWorkspaceApi()
  const taskRunStateName = computed(() => props.taskRun.state?.name ?? null)
  const logsSubscriptionOptions = useStatePolling(taskRunStateName)
  const logsSubscription = usePaginatedSubscription(api.logs.getLogs, [logsFilter], logsSubscriptionOptions)
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