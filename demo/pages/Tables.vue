<template>
  <p-layout-default>
    <template #header>
      <h1 class="text-3xl">
        Tables
      </h1>
    </template>

    <DemoSection heading="Flows">
      <FlowsTable :flows="flowsData" />
    </DemoSection>

    <DemoSection heading="Deployments">
      <DeploymentsTable :deployments="deploymentsData" />
    </DemoSection>

    <DemoSection heading="Work Queues">
      <WorkQueuesTable :work-queues="queuesData" />
    </DemoSection>
  </p-layout-default>
</template>

<script lang="ts" setup>
  import DemoSection from '../components/DemoSection.vue'
  import DeploymentsTable from '@/components/DeploymentsTable.vue'
  import FlowsTable from '@/components/FlowsTable.vue'
  import WorkQueuesTable from '@/components/WorkQueuesTable.vue'
  import { mocker } from '@/services'

  const flowsData = mocker.createMany('flow', mocker.create('number', [ 3, 10]))
  const deploymentsData = mocker.createMany('deployment', mocker.create('number', [3, 10]))
  const queuesData = mocker.createMany('workQueue', mocker.create('number', [3, 10]))
</script>