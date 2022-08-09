<template>
  <DemoSection heading="Meta Wells">
    <div class="flex flex-wrap gap-8">
      <DemoSubSection heading="Flow Run Meta Well">
        <FlowRunDetails :flow-run="flowRunData" class="w-[250px] border-2 border-blue-200 border-dashed" alternate />
      </DemoSubSection>

      <DemoSubSection heading="Flow Meta Well">
        <FlowDetails :flow="flowData" class="w-[250px] border-2 border-blue-200 border-dashed" alternate />
      </DemoSubSection>

      <DemoSubSection heading="Deployment Meta Well">
        <DeploymentDetails :deployment="deploymentData" class="w-[250px] border-2 border-blue-200 border-dashed" alternate />
      </DemoSubSection>

      <DemoSubSection heading="Work Queue Meta Well">
        <WorkQueueDetails :work-queue="workQueueData" class="w-[250px] border-2 border-blue-200 border-dashed" alternate />
      </DemoSubSection>
    </div>
  </DemoSection>
</template>

<script lang="ts" setup>
  import DemoSection from '../components/DemoSection.vue'
  import DemoSubSection from '../components/DemoSubSection.vue'
  import DeploymentDetails from '@/components/DeploymentDetails.vue'
  import FlowDetails from '@/components/FlowDetails.vue'
  import FlowRunDetails from '@/components/FlowRunDetails.vue'
  import WorkQueueDetails from '@/components/WorkQueueDetails.vue'
  import { mocker } from '@/services'

  const flowData = mocker.create('flow')

  const deploymentData = mocker.create('deployment')

  const flowRunData = mocker.create('flowRun')

  const workQueueData = mocker.create('workQueue')
</script>