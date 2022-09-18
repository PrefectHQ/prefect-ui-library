<template>
  <DemoSection heading="Page headings">
    <DemoSubSection heading="Template">
      <p-content>
        <PageHeading :crumbs="pageHeadingCrumbs" />
      </p-content>
    </DemoSubSection>

    <DemoSubSection heading="Top-level Pages">
      <p-content>
        <PageHeadingAccountSettings />
        <PageHeadingApiKeys />
        <PageHeadingBlocks />
        <PageHeadingBlocksCatalog />
        <PageHeadingDeployments />
        <PageHeadingFlowRuns :selected="filterSelect" />
        <PageHeadingFlows />
        <PageHeadingNotifications />
        <PageHeadingWorkQueues />
        <PageHeadingWorkspaceSettings />
      </p-content>
    </DemoSubSection>

    <DemoSubSection heading="Object Pages">
      <p-content>
        <PageHeadingBlock :block-document="blockDocument" />
        <PageHeadingBlockEdit :block-document="blockDocument" />
        <PageHeadingBlocksCatalogCreate :block-type="blockType" />
        <PageHeadingBlocksCatalogView :block-type="blockType" />
        <PageHeadingDeployment :deployment="deployment" />
        <PageHeadingDeploymentEdit :deployment="deployment" />
        <PageHeadingFlow :flow="flow" />
        <PageHeadingFlowRun :flow-run="flowRun" />
        <PageHeadingFlowRunRadar :flow-run="flowRun" />
        <PageHeadingTaskRun :task-run="taskRun" />
        <PageHeadingNotificationCreate />
        <PageHeadingNotificationEdit />
        <PageHeadingWorkQueue :work-queue="queue" />
        <PageHeadingWorkQueueCreate />
        <PageHeadingWorkQueueEdit :work-queue="queue" />
      </p-content>
    </DemoSubSection>
  </DemoSection>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import PageHeading from '@/components/PageHeading.vue'
  import PageHeadingAccountSettings from '@/components/PageHeadingAccountSettings.vue'
  import PageHeadingApiKeys from '@/components/PageHeadingApiKeys.vue'
  import PageHeadingBlock from '@/components/PageHeadingBlock.vue'
  import PageHeadingBlockEdit from '@/components/PageHeadingBlockEdit.vue'
  import PageHeadingBlocks from '@/components/PageHeadingBlocks.vue'
  import PageHeadingBlocksCatalog from '@/components/PageHeadingBlocksCatalog.vue'
  import PageHeadingBlocksCatalogCreate from '@/components/PageHeadingBlocksCatalogCreate.vue'
  import PageHeadingBlocksCatalogView from '@/components/PageHeadingBlocksCatalogView.vue'
  import PageHeadingDeployment from '@/components/PageHeadingDeployment.vue'
  import PageHeadingDeploymentEdit from '@/components/PageHeadingDeploymentEdit.vue'
  import PageHeadingDeployments from '@/components/PageHeadingDeployments.vue'
  import PageHeadingFlow from '@/components/PageHeadingFlow.vue'
  import PageHeadingFlowRun from '@/components/PageHeadingFlowRun.vue'
  import PageHeadingFlowRunRadar from '@/components/PageHeadingFlowRunRadar.vue'
  import PageHeadingFlowRuns from '@/components/PageHeadingFlowRuns.vue'
  import PageHeadingFlows from '@/components/PageHeadingFlows.vue'
  import PageHeadingNotificationCreate from '@/components/PageHeadingNotificationCreate.vue'
  import PageHeadingNotificationEdit from '@/components/PageHeadingNotificationEdit.vue'
  import PageHeadingNotifications from '@/components/PageHeadingNotifications.vue'
  import PageHeadingTaskRun from '@/components/PageHeadingTaskRun.vue'
  import PageHeadingWorkQueue from '@/components/PageHeadingWorkQueue.vue'
  import PageHeadingWorkQueueCreate from '@/components/PageHeadingWorkQueueCreate.vue'
  import PageHeadingWorkQueueEdit from '@/components/PageHeadingWorkQueueEdit.vue'
  import PageHeadingWorkQueues from '@/components/PageHeadingWorkQueues.vue'
  import PageHeadingWorkspaceSettings from '@/components/PageHeadingWorkspaceSettings.vue'

  import { mocker } from '@/services'
  import { capitalize } from '@/utilities'

  const blockType = mocker.create('blockType')
  const blockDocument = mocker.create('blockDocument')
  const flow = mocker.create('flow', [{ name: 'ETL' }])
  const deployment = mocker.create('deployment', [{ name: 'Production' }])
  const queue = mocker.create('workQueue', [{ name: 'ECS - Prod' }])
  const flowRun = mocker.create('flowRun')
  const taskRun = mocker.create('taskRun')
  const filterSelect = ref('week')

  const pageHeadingCrumbs = mocker.createMany('noun', 3).map((noun, i) => ({ text: capitalize(noun), to: i !== 0 ? '/nothing' : undefined }))
</script>