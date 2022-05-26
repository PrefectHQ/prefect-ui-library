<template>
  <DemoSection heading="Page headings">
    <DemoSubSection heading="Top-level Pages">
      <page-heading-flows />
      <page-heading-deployments />
      <page-heading-queues />
      <page-heading-flow-runs />
      <page-heading-workspace-settings />
      <page-heading-api-keys />
      <page-heading-account-settings />
    </DemoSubSection>

    <DemoSubSection heading="Object Pages">
      <page-heading-flow :flow="flow" @refresh="router.push('charts')" />
      <page-heading-deployment :deployment="deployment" @refresh="router.push('charts')" />
      <page-heading-queue :queue="queue" @refresh="router.push('charts')" />
      <page-heading-flow-run :flow-run="flowRun" @refresh="router.push('charts')" />
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router'
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import PageHeadingAccountSettings from '@/components/PageHeadingAccountSettings.vue'
  import PageHeadingApiKeys from '@/components/PageHeadingApiKeys.vue'
  import PageHeadingDeployment from '@/components/PageHeadingDeployment.vue'
  import PageHeadingDeployments from '@/components/PageHeadingDeployments.vue'
  import PageHeadingFlow from '@/components/PageHeadingFlow.vue'
  import PageHeadingFlowRun from '@/components/PageHeadingFlowRun.vue'
  import PageHeadingFlowRuns from '@/components/PageHeadingFlowRuns.vue'
  import PageHeadingFlows from '@/components/PageHeadingFlows.vue'
  import PageHeadingQueue from '@/components/PageHeadingQueue.vue'
  import PageHeadingQueues from '@/components/PageHeadingQueues.vue'
  import PageHeadingWorkspaceSettings from '@/components/PageHeadingWorkspaceSettings.vue'
  import { mocker } from '@/services'

  const router = useRouter()

  const flow = mocker.create('flow', [{ name: 'ETL' }])
  const deployment = mocker.create('deployment', [{ name: 'Production' }])
  const queue = mocker.create('workQueue', [{ name: 'ECS - Prod' }])
  const flowRun = mocker.create('flowRun')
</script>