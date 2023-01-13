<template>
  <ComponentPage title="Logs" :demos="demos">
    <LogsContainer :logs="logs" class="run-logs__logs-container" />

    <template #level-badges>
      <p-content>
        <LogLevelLabel :level="0" />
        <LogLevelLabel :level="10" />
        <LogLevelLabel :level="20" />
        <LogLevelLabel :level="30" />
        <LogLevelLabel :level="40" />
        <LogLevelLabel :level="50" />
      </p-content>
    </template>

    <template #log-row>
      <div class="run-logs__log-row-container">
        <template v-for="log in logs" :key="log.id">
          <LogRow :log="log" />
        </template>
      </div>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { LogsContainer, LogLevelLabel, LogRow } from '@/components'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useFlowRunMock } from '@/demo/compositions/useFlowRunsMock'
  import { useTaskRunsMock } from '@/demo/compositions/useTaskRunsMock'
  import { DemoSection } from '@/demo/types/demoSection'
  import { Log } from '@/models'
  import { mocker } from '@/services'

  const demos: DemoSection[] = [{ title: 'Level Badges' }, { title: 'Log Row' }]

  const flowRun = useFlowRunMock()
  const taskRuns = useTaskRunsMock(20)

  const logs: Log[] = []
  taskRuns.forEach((taskRun) => {
    logs.push(...mocker.createMany('log', mocker.create('number', [1, 10]), [{ flowRunId: flowRun.id, taskRunId: taskRun.id }]))
  })
</script>

<style>
.run-logs__logs-container { @apply
  max-h-96
}

.run-logs__log-row-container { @apply
  max-h-96
}
</style>
