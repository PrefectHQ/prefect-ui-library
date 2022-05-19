<template>
  <Section heading="Meta Wells">
    <SubSection heading="Flow Meta Well">
      <FlowMetaWell :flow-id="flowData.id" :created="flowData.created" :tags="flowData.tags" class="w-[250px]" />
    </SubSection>
  </Section>
</template>

    <script lang="ts" setup>
  import Section from '../components/section.vue'
  import SubSection from '../components/subSection.vue'
  import FlowMetaWell from '@/components/FlowMetaWell.vue'

  const flowData = {
    id: '3fa85f64',
    created: '2022-04-27T21:22:32.524Z',
    tags: ['db', 'etl', 'production', 'dev', 'marketing', 'sales', 'k8s', 'eks', 'staging'],
  }
</script>