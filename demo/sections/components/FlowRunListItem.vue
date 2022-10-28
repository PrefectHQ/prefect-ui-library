<template>
  <ComponentPage
    title="FlowRunListItem"
    :demos="[{ title: 'Basic' }]"
  >
    <template #description>
      This is where we add a short description of <p-code>FlowListItem</p-code>. Describe the components intent, not hyper specific documentation that belongs on vitepress page.
    </template>

    <template #basic>
      <FlowRunListItem :flow-run="flowRun" :selected="[]" class="color-mode-default" />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import FlowRunListItem from '@/components/FlowRunListItem.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useWorkspaceApiMock } from '@/demo/utilities/api'
  import { mocker } from '@/services'

  const flow = mocker.create('flow')
  const workQueue = mocker.create('workQueue')
  const deployment = mocker.create('deployment', [
    {
      workQueueName: workQueue.name,
    },
  ])

  const flowRun = mocker.create('flowRun', [
    {
      flowId: flow.id,
      deploymentId: deployment.id,
      workQueueName: workQueue.name,
    },
  ])

  const taskRuns = mocker.createMany('taskRun', mocker.create('number', [0, 10]), [
    {
      flowRunId: flowRun.id,
    },
  ])

  useWorkspaceApiMock({
    flows: flow,
    flowRuns: flowRun,
    deployments: deployment,
    workQueues: workQueue,
    taskRuns,
  })
</script>
