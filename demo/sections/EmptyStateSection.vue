<template>
  <Section heading="Empty States">
    <SubSection heading="Flow">
      <FlowsPageEmptyState />
    </SubSection>
    <SubSection heading="Deployments">
      <DeploymentsPageEmptyState />
    </SubSection>
    <SubSection heading="Queues">
      <WorkQueuesPageEmptyState />
    </SubSection>
  </Section>
</template>

<script lang="ts" setup>
  import Section from '../components/section.vue'
  import SubSection from '../components/subSection.vue'
  import DeploymentsPageEmptyState from '@/components/DeploymentsPageEmptyState.vue'
  import FlowsPageEmptyState from '@/components/FlowsPageEmptyState.vue'
  import WorkQueuesPageEmptyState from '@/components/WorkQueuesPageEmptyState.vue'
</script>

