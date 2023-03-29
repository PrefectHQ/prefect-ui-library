<template>
  <ComponentPage title="ArtifactDataView" :demos="demos">
    <template #markdown>
      <div class="artifact-data-view__container">
        <ArtifactDataView :artifact="markdown" />
      </div>
    </template>

    <template #table>
      <div class="artifact-data-view__container">
        <ArtifactDataView :artifact="table" />
      </div>
    </template>

    <template #unknown>
      <div class="artifact-data-view__container">
        <ArtifactDataView :artifact="unknown" />
      </div>
    </template>

    <template #result>
      <div class="artifact-data-view__container">
        <ArtifactDataView :artifact="result" />
      </div>
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

<style>
.artifact-data-view__container { @apply
  max-h-96
  overflow-auto
  relative
  h-96
}
</style>