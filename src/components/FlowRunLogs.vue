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
            <div v-if="logLevel > 0">
              No logs match your filter criteria
            </div>
            <div v-else-if="flowRun.stateType == 'scheduled'">
              This run is scheduled and hasn't generated logs
            </div>
            <div v-else-if="flowRun.stateType == 'running'">
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
  import LogLevelSelect from './LogLevelSelect.vue'
  import LogsSort from './LogsSort.vue'
  import LogsContainer from '@/components/LogsContainer.vue'
  import { useWorkspaceApi } from '@/compositions'
  import { usePaginatedSubscription } from '@/compositions/usePaginatedSubscription'
  import { FlowRun } from '@/models/FlowRun'
  import { Log, LogLevel } from '@/models/Log'
  import { LogsRequestSort, LogsRequestFilter } from '@/types/LogsRequestFilter'

  const props = defineProps<{
    flowRun: FlowRun,
  }>()

  const logLevel = ref<LogLevel>(0)
  const logsSort = ref<LogsRequestSort>('TIMESTAMP_ASC')
  const hasFilter = computed(() => logLevel.value !== 0)
  const logsFilter = computed<LogsRequestFilter>(() => ({
    logs: {
      flow_run_id: {
        any_: [props.flowRun.id],
      },
      level: {
        ge_: logLevel.value,
      },
    },
    sort: logsSort.value,
  }))

  const api = useWorkspaceApi()
  const logsSubscription = usePaginatedSubscription(api.logs.getLogs, [logsFilter], { interval:  5000 })
  const logs = computed<Log[]>(() => logsSubscription.response ?? [])

  function clear(): void {
    logLevel.value = 0
  }
</script>

<style>
.flow-run-logs__search { @apply
  flex
  justify-end
  items-center
  mb-4
  gap-2
}
</style>