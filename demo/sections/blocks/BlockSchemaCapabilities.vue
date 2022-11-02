<template>
  <ComponentPage title="BlockSchemaCapabilities" :demos="demos">
    <BlockSchemaCapabilities :capabilities="capabilities" />

    <template #with-wrapper>
      <BlockSchemaCapabilities :capabilities="capabilities" wrapper />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import BlockSchemaCapabilities from '@/components/BlockSchemaCapabilities.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useBlockSchemaCapabilitiesMock } from '@/demo/compositions/useBlockSchemaCapabilitiesMock'
  import { DemoSection } from '@/demo/types/demoSection'

  const demos: DemoSection = { title: 'With Wrapper', description: 'Using p-tag-wrapper' }
  const capabilities = useBlockSchemaCapabilitiesMock(8)
</script>