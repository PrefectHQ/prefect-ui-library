<template>
  <ComponentPage title="ArtifactDataView" :demos="demos">
    <template #markdown>
      <ArtifactDataView :artifact="markdown" />
    </template>

    <template #table>
      <ArtifactDataView :artifact="table" />
    </template>

    <template #unknown>
      <ArtifactDataView :artifact="unknown" />
    </template>

    <template #result>
      <ArtifactDataView :artifact="result" />
    </template>
  </ComponentPage>
</template>

<script lang="ts" setup>
  import ArtifactDataView from '@/components/ArtifactDataView.vue'
  import ComponentPage from '@/demo/components/ComponentPage.vue'
  import { DemoSection } from '@/demo/types/demoSection'
  import { mocker } from '@/index'


  const demos: DemoSection[] = [
    {
      title: 'Markdown',
    },
    {
      title: 'Table',
    },
    {
      title: 'Result',
    },
    {
      title: 'Unknown',
    },
  ]

  const unknown = mocker.create('artifact', [{ type: 'unknown' }])
  const result = mocker.create('artifact', [{ type: 'result' }])
  const table = mocker.create('artifact', [{ type: 'table' }])
  const markdown = mocker.create('artifact', [{ type: 'markdown' }])
</script>
