<template>
  <DemoSection heading="Page headings">
    <DemoSubSection heading="Top-level Pages">
      <page-heading-flows />
      <page-heading-deployments />
      <page-heading-queues />
      <page-heading-flow-runs />
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import PageHeadingDeployments from '@/components/PageHeadingDeployments.vue'
  import PageHeadingFlowRuns from '@/components/PageHeadingFlowRuns.vue'
  import PageHeadingFlows from '@/components/PageHeadingFlows.vue'
  import PageHeadingQueues from '@/components/PageHeadingQueues.vue'
</script>