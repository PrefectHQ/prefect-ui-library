<template>
  <Section heading="Meta Wells">
    <div class="flex flex-wrap gap-8">
      <SubSection heading="Flow Run Meta Well">
        <FlowRunMetaWell :flow-run="flowRunData" class="w-[250px] border-2 border-blue-200 border-dashed" />
      </SubSection>

      <SubSection heading="Flow Meta Well">
        <FlowMetaWell :flow="flowData" class="w-[250px] border-2 border-blue-200 border-dashed" />
      </SubSection>

      <SubSection heading="Deployment Meta Well">
        <DeploymentMetaWell :deployment="deploymentData" class="w-[250px] border-2 border-blue-200 border-dashed" />
      </SubSection>
    </div>
  </Section>
</template>

<script lang="ts" setup>
  import Section from '../components/section.vue'
  import SubSection from '../components/subSection.vue'
  import DeploymentMetaWell from '@/components/DeploymentMetaWell.vue'
  import FlowMetaWell from '@/components/FlowMetaWell.vue'
  import FlowRunMetaWell from '@/components/FlowRunMetaWell.vue'
  import { mocker } from '@/services'

  const flowData = mocker.create('flow')

  const deploymentData = mocker.create('deployment')

  const flowRunData = mocker.create('flowRun')
</script>