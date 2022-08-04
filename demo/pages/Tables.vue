<template>
  <p-layout-default>
    <template #header>
      <h1 class="text-3xl">
        Tables
      </h1>
    </template>

    <DemoSection heading="Block Documents">
      <BlockDocumentsTable :block-documents="blockDocumentsData" />
    </DemoSection>

    <DemoSection heading="Deployments">
      <DeploymentsTable :deployments="deploymentsData" />
    </DemoSection>

    <DemoSection heading="Flows">
      <FlowsTable :flows="flowsData" />
    </DemoSection>

    <DemoSection heading="Notifications">
      <NotificationsTable :notifications="notificationsData" />
    </DemoSection>

    <DemoSection heading="Parameters">
      <ParametersTable :deployment="parametersData" />
    </DemoSection>

    <DemoSection heading="Work Queues">
      <WorkQueuesTable :work-queues="workQueuesData" />
    </DemoSection>
  </p-layout-default>
</template>

<script lang="ts" setup>
  import DemoSection from '../components/DemoSection.vue'
  import BlockDocumentsTable from '@/components/BlockDocumentsTable.vue'
  import DeploymentsTable from '@/components/DeploymentsTable.vue'
  import FlowsTable from '@/components/FlowsTable.vue'
  import NotificationsTable from '@/components/NotificationsTable.vue'
  import ParametersTable from '@/components/ParametersTable.vue'
  import WorkQueuesTable from '@/components/WorkQueuesTable.vue'
  import { mocker } from '@/services'

  const flowsData = mocker.createMany('flow', mocker.create('number', [ 3, 10]))
  const deploymentsData = mocker.createMany('deployment', mocker.create('number', [3, 10]))
  const workQueuesData = mocker.createMany('workQueue', mocker.create('number', [3, 10]))
  const blockDocumentsData = mocker.createMany('blockDocument', mocker.create('number', [3, 10]))
  const notificationsData = mocker.createMany('notification', mocker.create('number', [3, 10]))
  const parametersData = mocker.create('deployment')
</script>