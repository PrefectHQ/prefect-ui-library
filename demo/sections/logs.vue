<template>
  <Section heading="Logs">
    <SubSection heading="Levels">
      <div class="flex gap-1 flex-wrap">
        <template v-for="level in 5" :key="level">
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
  import { IFlowRun, ILog, ITaskRun } from '@/models'
  import { mocker } from '@/services'

  const logLevels = [null, 1, 2, 3, 4, 5]

  const getRandomLogLevel = (): null | number => {
    return logLevels[Math.floor(Math.random() * logLevels.length)]
  }

  const flowRun: IFlowRun = mocker.create('flowRun', [{ name: 'ostentatious-axolotl' }])
  const taskRun: ITaskRun = mocker.create('taskRun', [{ name: 'delicious-candycorn' }])


  const flowRunLogs: ILog[] = Array.from({ length: 10 }, () => mocker.create('log', [{ taskRunId: Math.random() > 0.65 ? taskRun.id : '', flowRunId: flowRun.id, level: getRandomLogLevel() }])).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
</script>