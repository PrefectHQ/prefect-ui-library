<template>
  <Section heading="Logs">
    <SubSection heading="Levels">
      <div class="flex gap-1 flex-wrap">
        <template v-for="level in logLevels" :key="level">
          <log-level-label :level="level" />
        </template>
      </div>
    </SubSection>

    <SubSection heading="Log Rows">
      <template v-for="log in flowRunLogs" :key="log.id">
        <log-row :log="log" show-task-run-link />
      </template>
    </SubSection>

    <SubSection heading="Logs">
      <logs-container :logs="flowRunLogs" class="h-[400px] overflow-auto" />
    </SubSection>
  </Section>
</template>

<script lang="ts" setup>
  import Section from '../components/section.vue'
  import SubSection from '../components/subSection.vue'
  import LogLevelLabel from '@/components/LogLevelLabel.vue'
  import LogRow from '@/components/LogRow.vue'
  import LogsContainer from '@/components/LogsContainer.vue'
  import { logLevels } from '@/mocks/log'
  import { IFlowRun, ILog } from '@/models'
  import { mocker } from '@/services'


  const flowRun: IFlowRun = mocker.create('flowRun')

  const flowRunLogs: ILog[] = Array.from({ length: 10 }, () => mocker.create('log', [{ taskRunId: Math.random() > 0.65 ? '' : null, flowRunId: flowRun.id }])).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
</script>