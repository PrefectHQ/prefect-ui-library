<template>
  <DemoSection heading="Tables">
    <DemoSubSection heading="Flows table">
      <FlowsTable :flows="flowsData" />
    </DemoSubSection>

    <DemoSubSection heading="Deployments table">
      <DeploymentsTable :deployments="deploymentsData" />
    </DemoSubSection>

    <DemoSubSection heading="Work queues table">
      <WorkQueuesTable :work-queues="queuesData" />
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import DeploymentsTable from '@/components/DeploymentsTable.vue'
  import FlowsTable from '@/components/FlowsTable.vue'
  import WorkQueuesTable from '@/components/WorkQueuesTable.vue'
  import { mocker } from '@/services'

  const flowsData = mocker.createMany('flow', 3)
  const deploymentsData = mocker.createMany('deployment', 10)
  const queuesData = mocker.createMany('workQueue', 3)
</script>