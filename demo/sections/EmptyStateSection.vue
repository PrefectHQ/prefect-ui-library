<template>
  <Section heading="Empty States">
    <SubSection heading="Flow">
      <FlowsPageFlowEmptyState />
    </SubSection>
    <SubSection heading="Deployments">
      <DeploymentPageEmptyState />
    </SubSection>
    <SubSection heading="Queues">
      <WorkQueuesPageEmptyState />
    </SubSection>
  </Section>
</template>

<script lang="ts" setup>
  import Section from '../components/section.vue'
  import SubSection from '../components/subSection.vue'
  import DeploymentPageEmptyState from '@/components/DeploymentPageEmptyState.vue'
  import FlowsPageFlowEmptyState from '@/components/FlowsPageFlowEmptyState.vue'
  import WorkQueuesPageEmptyState from '@/components/WorkQueuesPageEmptyState.vue'
</script>

