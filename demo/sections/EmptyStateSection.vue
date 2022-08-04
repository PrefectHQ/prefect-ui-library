<template>
  <DemoSection heading="Empty States">
    <DemoSubSection heading="Blocks">
      <BlocksPageEmptyState />
    </DemoSubSection>
    <DemoSubSection heading="Deployments">
      <DeploymentsPageEmptyState />
    </DemoSubSection>
    <DemoSubSection heading="Deployment Description">
      <DeploymentDescriptionEmptyState :deployment="deployment" />
    </DemoSubSection>
    <DemoSubSection heading="Flow">
      <FlowsPageEmptyState />
    </DemoSubSection>
    <DemoSubSection heading="Flow Runs">
      <FlowRunsPageEmptyState />
    </DemoSubSection>
    <DemoSubSection heading="Notifications">
      <NotificationsPageEmptyState />
    </DemoSubSection>
    <DemoSubSection heading="Work Queues">
      <WorkQueuesPageEmptyState />
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import BlocksPageEmptyState from '@/components/BlocksPageEmptyState.vue'
  import DeploymentDescriptionEmptyState from '@/components/DeploymentDescriptionEmptyState.vue'
  import DeploymentsPageEmptyState from '@/components/DeploymentsPageEmptyState.vue'
  import FlowRunsPageEmptyState from '@/components/FlowRunsPageEmptyState.vue'
  import FlowsPageEmptyState from '@/components/FlowsPageEmptyState.vue'
  import NotificationsPageEmptyState from '@/components/NotificationsPageEmptyState.vue'
  import WorkQueuesPageEmptyState from '@/components/WorkQueuesPageEmptyState.vue'
  import { mocker } from '@/services'

  const deployment = mocker.create('deployment')
</script>

