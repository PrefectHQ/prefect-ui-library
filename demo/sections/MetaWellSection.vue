<template>
  <Section heading="Meta Wells">
    <SubSection heading="Flow Meta Well">
      <FlowMetaWell :flow-meta="flowData" class="w-[250px] border-2 border-slate-100" />
    </SubSection>

    <SubSection heading="Deployment Meta Well">
      <DeploymentMetaWell :deployment-meta="deploymentData" class="w-[250px] border-2 border-slate-100" />
    </SubSection>
  </Section>
</template>

    <script lang="ts" setup>
  import Section from '../components/section.vue'
  import SubSection from '../components/subSection.vue'
  import DeploymentMetaWell from '@/components/DeploymentMetaWell.vue'
  import FlowMetaWell from '@/components/FlowMetaWell.vue'

  const flowData = {
    flowId: '3fa85f64',
    created: '2022-04-27T21:22:32.524Z',
    tags: ['db', 'etl', 'production', 'dev', 'marketing', 'sales', 'k8s', 'eks', 'staging'],
  }

  const deploymentData = {
    deploymentId: '93cd33ac',
    flowId: '74df52bg',
    created: '2022-04-27T21:22:32.524Z',
    tags: ['db', 'etl', 'production', 'dev', 'marketing', 'sales', 'k8s', 'eks', 'staging'],
  }
</script>