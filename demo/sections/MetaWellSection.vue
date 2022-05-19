<template>
  <Section heading="Meta Wells">
    <div class="flex flex-wrap gap-8">
      <SubSection heading="Flow Run Meta Well">
        <FlowRunMetaWell :flow-run-meta="flowRunData" class="w-[250px] border-2 border-blue-200 border-dashed" />
      </SubSection>

      <SubSection heading="Flow Meta Well">
        <FlowMetaWell :flow-meta="flowData" class="w-[250px] border-2 border-blue-200 border-dashed" />
      </SubSection>

      <SubSection heading="Deployment Meta Well">
        <DeploymentMetaWell :deployment-meta="deploymentData" class="w-[250px] border-2 border-blue-200 border-dashed" />
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

  const flowRunData = {
    stateBadge: mocker.create('state', [{ type: 'completed', name: 'Completed ' }]),
    duration: '1h 25m 16s',
    startTime: '7 Jan 2020',
    flowName: 'ETL',
    deploymentName: 'Nightly ETL',
    flowRunId: '3fa85f64',
    flowId: '74df52bg',
    deploymentId: '93cd33ac',
    created: '2022-04-27T21:22:32.524Z',
    flowVersion: '1.0',
    idempotencyKey: '2c963f66afa6',
    runCount: 1,
    flowRunner: 'Kubernetes',
    tags: ['db', 'etl', 'production', 'dev', 'marketing', 'sales', 'k8s', 'eks', 'staging'],
  }
</script>