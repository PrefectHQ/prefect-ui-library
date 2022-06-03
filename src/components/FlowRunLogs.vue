<template>
  <div class="flow-run-logs">
    <div class="flow-run-logs__search">
      <LogLevelSelect v-model:selected="logLevel" />
    </div>
    <LogsContainer :logs="logs">
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
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { ref, computed } from 'vue'
  import LogLevelSelect from './LogLevelSelect.vue'
  import LogsContainer from '@/components/LogsContainer.vue'
  import { FlowRun } from '@/models/FlowRun'
  import { Log, LogLevel } from '@/models/Log'
  import { logsApiKey } from '@/services/LogsApi'
  import { LogsRequestSort, LogsRequestFilter } from '@/types/LogsRequestFilter'
  import { inject } from '@/utilities/inject'

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

  const logsApi = inject(logsApiKey)
  const logsSubscription = useSubscription(logsApi.getLogs, [logsFilter], { interval:  5000 })
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
}
</style>