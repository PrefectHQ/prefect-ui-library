<template>
  <DemoSection heading="Tables">
    <DemoSubSection heading="Flows table">
      <FlowsTable :flows="flowsData" />
    </DemoSubSection>

    <DemoSubSection heading="Deployments table">
      <DeploymentsTable :deployments="deploymentsData" />
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import DeploymentsTable from '@/components/DeploymentsTable.vue'
  import FlowsTable from '@/components/FlowsTable.vue'
  import { mocker } from '@/services'

  const flowsData = mocker.createMany('flow', 3)
  const deploymentsData = mocker.createMany('deployment', 3)
</script>