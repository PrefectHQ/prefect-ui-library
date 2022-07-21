<template>
  <DemoSection heading="Logs">
    <DemoSubSection heading="Levels">
      <div class="flex gap-1 flex-wrap">
        <template v-for="level in logLevel" :key="level">
          <log-level-label :level="level" />
        </template>
      </div>
    </DemoSubSection>

    <DemoSubSection heading="Log Rows">
      <template v-for="log in flowRunLogs" :key="log.id">
        <log-row :log="log" show-task-run-link />
      </template>
    </DemoSubSection>

    <DemoSubSection heading="Logs">
      <LogsContainer :logs="flowRunLogs" class="h-[400px] overflow-auto" />
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import LogLevelLabel from '@/components/LogLevelLabel.vue'
  import LogRow from '@/components/LogRow.vue'
  import LogsContainer from '@/components/LogsContainer.vue'
  import { IFlowRun, ILog, logLevel } from '@/models'
  import { mocker } from '@/services'


  const flowRun: IFlowRun = mocker.create('flowRun')

  const flowRunLogs: ILog[] = Array.from({ length: 10 }, () => mocker.create('log', [{ taskRunId: Math.random() > 0.65 ? '' : undefined, flowRunId: flowRun.id }])).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
</script>