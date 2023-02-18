<template>
  <ComponentPage title="ArtifactCards" :demos="demos">
    <template #description>
      <p-checkbox v-model="condense" label="Condense" />
      <ArtifactSummaryCard :artifact="artifact" :condense="condense" />
    </template>

    <template #summary-card>
      <p-checkbox v-model="condense" label="Condense" />
      <ArtifactSummaryCard :artifact="artifact" :condense="condense" />
    </template>

    <template #markdown-description>
      <ArtifactDescription :artifact="artifact" />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import ArtifactDescription from '@/components/ArtifactDescription.vue'
  import ArtifactSummaryCard from '@/components/ArtifactSummaryCard.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useArtifactsMock } from '@/demo/compositions/useArtifactsMock'
  import { DemoSection } from '@/demo/types/demoSection'

  const demos: DemoSection[] = [
    { title: 'Summary Card', description: 'An artifact summary card used for lists of artifacts or brief overlays' },
    { title: 'Markdown Description', description: 'A card used to render the internal markdown of an artifact' },
  ]

  const start = new Date()
  start.setHours(0)

  const condense = ref(false)
  const artifacts = useArtifactsMock(1)

  const artifact = computed(() => artifacts[0])
</script>