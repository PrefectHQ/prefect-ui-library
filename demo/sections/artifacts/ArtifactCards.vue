<template>
  <ComponentPage title="ArtifactCards" :demos="demos">
    <template #description>
      <ArtifactSummaryCard :artifact="artifact" />
    </template>

    <template #summary-card>
      <ArtifactSummaryCard :artifact="artifact" />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import ArtifactSummaryCard from '@/components/ArtifactSummaryCard.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useArtifactsMock } from '@/demo/compositions/useArtifactsMock'
  import { DemoSection } from '@/demo/types/demoSection'

  const demos: DemoSection[] = [{ title: 'Summary Card', description: 'An artifact summary card used for lists of artifacts or brief overlays' }]

  const start = new Date()
  start.setHours(0)

  const artifacts = useArtifactsMock(1)

  const artifact = computed(() => artifacts[0])
</script>