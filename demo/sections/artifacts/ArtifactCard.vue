<template>
  <ComponentPage title="ArtifactCard" :demos="demos">
    <template #unknown>
      <ArtifactCard :artifact="artifact" />
    </template>
    <template #result>
      <ArtifactCard :artifact="result" />
    </template>
    <template #markdown>
      <ArtifactCard :artifact="markdown" />
    </template>
    <template #table>
      <ArtifactCard :artifact="table" />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import ArtifactCard from '@/components/ArtifactCard.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useArtifactMock } from '@/demo/compositions/useArtifactsMock'
  import { DemoSection } from '@/demo/types/demoSection'

  const demos: DemoSection[] = [
    {
      title: 'Result',
    },
    {
      title: 'Markdown',
    },
    {
      title: 'Table',
    },
    {
      title: 'Unknown',
    },
  ]

  const artifact = useArtifactMock({ type: 'unknown' })
  const result = useArtifactMock({ type: 'result' })
  const markdown = useArtifactMock({ type: 'markdown' })
  const table = useArtifactMock({ type: 'table' })
</script>
