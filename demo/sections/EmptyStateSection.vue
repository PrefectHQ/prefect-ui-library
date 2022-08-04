<template>
  <DemoSection heading="Empty States">
    <DemoSubSection heading="Blocks">
      <BlocksPageEmptyState />
    </DemoSubSection>
    <DemoSubSection heading="Deployments">
      <DeploymentsPageEmptyState />
    </DemoSubSection>
    <DemoSubSection heading="Flow">
      <FlowsPageEmptyState />
    </DemoSubSection>
    <DemoSubSection heading="Notifications">
      <NotificationsPageEmptyState />
    </DemoSubSection>
    <DemoSubSection heading="Queues">
      <WorkQueuesPageEmptyState />
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import BlocksPageEmptyState from '@/components/BlocksPageEmptyState.vue'
  import DeploymentsPageEmptyState from '@/components/DeploymentsPageEmptyState.vue'
  import FlowsPageEmptyState from '@/components/FlowsPageEmptyState.vue'
  import NotificationsPageEmptyState from '@/components/NotificationsPageEmptyState.vue'
  import WorkQueuesPageEmptyState from '@/components/WorkQueuesPageEmptyState.vue'
</script>

