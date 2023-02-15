<template>
  <ComponentPage title="ArtifactCards" :demos="demos">
    <div class="h-64">
      <ArtifactSummaryCard :artifact="artifact" />
    </div>

    <template #summary-card>
      <ArtifactSummaryCard :artifact="artifact" />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import ArtifactSummaryCard from '@/components/ArtifactSummaryCard.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useArtifactsMock } from '@/demo/compositions/useArtifactsMock'
  import { DemoSection } from '@/demo/types/demoSection'
  import { mocker } from '@/services'

  const demos: DemoSection[] = [{ title: 'Summary Card', description: 'An artifact summary card used for lists of artifacts or brief overlays' }]

  const start = new Date()
  start.setHours(0)
  const artifact = mocker.create('artifact', [{ created: mocker.create('date', [start]) }])
</script>