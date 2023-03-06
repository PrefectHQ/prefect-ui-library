<template>
  <ComponentPage title="ArtifactDescription" :demos="demos">
    <ArtifactDescription :artifact="artifact" />
  </ComponentPage>
</template>

<script lang="ts" setup>
  import ArtifactDescription from '@/components/ArtifactDescription.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useArtifactMock } from '@/demo/compositions/useArtifactsMock'
  import { DemoSection } from '@/demo/types/demoSection'

  const demos: DemoSection[] = []

  const artifact = useArtifactMock()
</script>
