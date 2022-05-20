<template>
  <DemoSection heading="Empty States">
    <DemoSubSection heading="Flow">
      <FlowsPageEmptyState />
    </DemoSubSection>
    <DemoSubSection heading="Deployments">
      <DeploymentsPageEmptyState />
    </DemoSubSection>
    <DemoSubSection heading="Queues">
      <WorkQueuesPageEmptyState />
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import DeploymentsPageEmptyState from '@/components/DeploymentsPageEmptyState.vue'
  import FlowsPageEmptyState from '@/components/FlowsPageEmptyState.vue'
  import WorkQueuesPageEmptyState from '@/components/WorkQueuesPageEmptyState.vue'
</script>

