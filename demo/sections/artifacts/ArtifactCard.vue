<template>
  <ComponentPage title="ArtifactCard" :demos="demos">
    <template #description>
      <p-checkbox v-model="condense" label="Condense" />
    </template>

    <template #unknown>
      <ArtifactCard :artifact="artifact" :condense="condense" />
    </template>
    <template #result>
      <ArtifactCard :artifact="result" :condense="condense" />
    </template>

    <template #markdown>
      <ArtifactCard :artifact="markdown" :condense="condense" />
    </template>
    <template #table>
      <ArtifactCard :artifact="table" :condense="condense" />
    </template>

    <template #custom-slot>
      <ArtifactCard :artifact="markdown" :condense="condense">
        <template #summary-label>
          ID (custom)
        </template>
        <template #summary-value>
          {{ markdown.id }}
        </template>
      </ArtifactCard>
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import ArtifactCard from '@/components/ArtifactCard.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { useArtifactMock } from '@/demo/compositions/useArtifactsMock'
  import { DemoSection } from '@/demo/types/demoSection'

  const condense = ref()

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
    {
      title: 'Custom slot',
    },
  ]

  const artifact = useArtifactMock({ type: 'unknown' })
  const result = useArtifactMock({ type: 'result' })
  const markdown = useArtifactMock({ type: 'markdown' })
  const table = useArtifactMock({ type: 'table' })
</script>
