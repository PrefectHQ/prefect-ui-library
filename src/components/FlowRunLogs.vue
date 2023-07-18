<template>
  <div class="flow-run-logs">
    <div class="flow-run-logs__search">
      <LogLevelSelect v-model:selected="logLevel" />
      <LogsSort v-model:selected="logsSort" />
    </div>
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
  import { ref, computed, toRefs, watch } from 'vue'
  import LogLevelSelect from '@/components/LogLevelSelect.vue'
  import LogsContainer from '@/components/LogsContainer.vue'
  import LogsSort from '@/components/LogsSort.vue'
  import { useWorkspaceApi } from '@/compositions'
  import { usePaginatedSubscription } from '@/compositions/usePaginatedSubscription'
  import { useStatePolling } from '@/compositions/useStatePolling'
  import { isTerminalStateType } from '@/models'
  import { LogsFilter } from '@/models/Filters'
  import { FlowRun } from '@/models/FlowRun'
  import { Log, LogLevel } from '@/models/Log'
  import { LogSortValues } from '@/types'

  const props = defineProps<{
    flowRun: FlowRun,
  }>()

  const { flowRun } = toRefs(props)
  const logLevel = ref<LogLevel>(0)
  const logsSort = ref<LogSortValues>('TIMESTAMP_ASC')
  const hasFilter = computed(() => logLevel.value !== 0)
  const logsFilter = computed<LogsFilter>(() => ({
    logs: {
      flowRunId: [props.flowRun.id],
      levelGreaterThan: logLevel.value,
    },
    sort: logsSort.value,
  }))

  const api = useWorkspaceApi()
  const options = useStatePolling(flowRun)
  const logsSubscription = usePaginatedSubscription(api.logs.getLogs, [logsFilter], options)
  const logs = computed<Log[]>(() => logsSubscription.response ?? [])
  const waitingForLogs = computed(() => !isTerminalStateType(flowRun.value.stateType) || logsSubscription.loading)

  function clear(): void {
    logLevel.value = 0
  }

  watch(() => flowRun.value.stateType, type => {
    if (isTerminalStateType(type)) {
      logsSubscription.refresh()
    }
  })
</script>

<style>
.flow-run-logs__search { @apply
  flex
  justify-end
  items-center
  mb-4
  gap-2
}

.flow-run-logs__empty-text { @apply
  !text-white
}
</style>