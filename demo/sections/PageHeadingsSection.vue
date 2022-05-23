<template>
  <DemoSection heading="Page headings">
    <DemoSubSection heading="List Pages">
      <page-heading-flows />
      <page-heading-deployments />
      <page-heading-queues />
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import PageHeadingDeployments from '@/components/PageHeadingDeployments.vue'
  import PageHeadingFlows from '@/components/PageHeadingFlows.vue'
  import PageHeadingQueues from '@/components/PageHeadingQueues.vue'
</script>