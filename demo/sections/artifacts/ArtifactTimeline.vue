<template>
  <ComponentPage title="ArtifactTimeline">
    <template #description>
      <ArtifactTimeline :artifact-key="key" />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import ArtifactTimeline from '@/components/ArtifactTimeline.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useArtifactsMock } from '@/demo/compositions/useArtifactsMock'
  import { mocker } from '@/services'


  const key = `${mocker.create('adjective')}-${mocker.create('noun')}`
  useArtifactsMock(100, { key })
</script>
