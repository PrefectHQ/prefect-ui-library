<template>
  <p-content class="flow-run-logs">
    <p-list-header>
      <template #controls>
        <LogLevelSelect v-model:selected="logLevel" />
        <LogsSort v-model:selected="logsSort" />
        <FlowRunLogsDownloadButton :flow-run />
      </template>
    </p-list-header>

    <LogsContainer :logs="logs" @bottom="logsSubscription.loadMore">
      <template #empty>
        <p-empty-results>
          <template #message>
            <div class="flow-run-logs__empty-text">
              <div v-if="logLevel > 0">
                No logs match your filter criteria
              </div>
              <div v-else-if="flowRun.stateType == 'scheduled'">
                This run is scheduled and hasn't generated logs
              </div>
              <div v-else-if="waitingForLogs">
                Waiting for logs...
              </div>
              <div v-else>
                This run didn't generate logs
              </div>
            </div>
          </template>

          <template v-if="hasFilter" #actions>
            <p-button size="sm" @click="clear">
              Clear Filters
            </p-button>
          </template>
        </p-empty-results>
      </template>
    </LogsContainer>
  </p-content>
</template>

<script lang="ts" setup>
  import { SubscriptionOptions, useNow } from '@prefecthq/vue-compositions'
  import { differenceInSeconds } from 'date-fns'
  import { ref, computed } from 'vue'
  import { LogLevelSelect, LogsContainer, LogsSort } from '@/components'
  import FlowRunLogsDownloadButton from '@/components/FlowRunLogsDownloadButton.vue'
  import { useLogsSort, useWorkspaceApi } from '@/compositions'
  import { usePaginatedSubscription } from '@/compositions/usePaginatedSubscription'
  import { isTerminalStateType } from '@/models'
  import { LogsFilter } from '@/models/Filters'
  import { FlowRun } from '@/models/FlowRun'
  import { Log, LogLevel } from '@/models/Log'

  const props = defineProps<{
    flowRun: FlowRun,
  }>()

  const logLevel = ref<LogLevel>(0)
  const { sort: logsSort } = useLogsSort()
  const hasFilter = computed(() => logLevel.value !== 0)
  const logsFilter = computed<LogsFilter>(() => ({
    logs: {
      flowRunId: [props.flowRun.id],
      levelGreaterThan: logLevel.value,
    },
    sort: logsSort.value,
  }))

  const { now } = useNow({ interval: 5_000 })
  const finishedRecently = computed(() => props.flowRun.endTime && differenceInSeconds(now.value, props.flowRun.endTime) < 30)

  const options = computed<SubscriptionOptions>(() => {
    const interval = 5_000

    // sometimes there is a delay in storing and retrieving logs. So we want to poll a bit longer to make sure
    // any logs that exist show up before we consider no logs to exist
    if (finishedRecently.value) {
      return { interval }
    }

    if (isTerminalStateType(props.flowRun.stateType)) {
      return {}
    }

    return { interval }
  })

  const api = useWorkspaceApi()
  const logsSubscription = usePaginatedSubscription(api.logs.getLogs, [logsFilter], options)
  const logs = computed<Log[]>(() => logsSubscription.response ?? [])

  const waitingForLogs = computed(() => {
    if (logs.value.length > 0) {
      return false
    }

    if (finishedRecently.value) {
      return true
    }

    return !isTerminalStateType(props.flowRun.stateType)
  })

  function clear(): void {
    logLevel.value = 0
  }
</script>

<style>
.flow-run-logs__empty-text { @apply
  !text-subdued
}
</style>