<template>
  <DemoSection heading="Tables">
    <DemoSubSection heading="Flows table">
      <FlowsTable :flows="flowsData" />
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import FlowsTable from '@/components/FlowsTable.vue'
  import { mocker } from '@/services'

  const flowsData = mocker.createMany('flow', 3)
</script>