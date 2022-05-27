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
    <DemoSubSection heading="Empty Result List - for filters">
      <EmptyResults>
        <template #message>
          No runs matched your filters
        </template>
        <template #actions>
          <p-link>Clear Filters</p-link>
        </template>
      </EmptyResults>
    </DemoSubSection>
    <DemoSubSection heading="Empty Results List - Plain">
      <EmptyResults />
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import { PLink } from '@prefecthq/prefect-design'
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import DeploymentsPageEmptyState from '@/components/DeploymentsPageEmptyState.vue'
  import EmptyResults from '@/components/EmptyResults.vue'
  import FlowsPageEmptyState from '@/components/FlowsPageEmptyState.vue'
  import WorkQueuesPageEmptyState from '@/components/WorkQueuesPageEmptyState.vue'
</script>

